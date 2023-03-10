import React from 'react';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {SettingsScreen} from '../../screens/settings';
import {CircleAbbrAvatar} from '../avatars/circle-abbr-avatar';
import {IconButton} from '../buttons/icon-button';
import {useFadeInScreen} from '../navigation/fade-in-screen';
import {StackPager, StackProvider} from '../navigation/stack-pager';

interface WelcomeHeaderProps {
  name: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = props => {
  const {push: pushFadeInScreen, pop: popFadeInScreen} = useFadeInScreen();

  return (
    <View row bg="white" h={75}>
      <View w={75} alignItems="center" justifyContent="center">
        <CircleAbbrAvatar text={props.name.slice(0, 1).toUpperCase() || '?'} />
      </View>
      <View flex={1} justifyContent="center" alignItems="flex-start">
        <Text text="WELCOME," typeFace="klavikaCondensedBold" fontSize={18} />
        <Text
          text={`${props.name.toUpperCase()}!`}
          typeFace="klavikaCondensedBold"
          fontSize={26}
          lineHeight={28}
        />
      </View>
      <View w={75} pt={20} alignItems="center" justifyContent="flex-start">
        <IconButton
          onPress={() => {
            pushFadeInScreen({
              component: (
                <StackProvider>
                  <StackPager
                    initialPage={<SettingsScreen />}
                    onStackEmpty={() => {
                      popFadeInScreen();
                    }}
                  />
                </StackProvider>
              ),
            });
          }}
          icon="cog"
          color="darkText"
          size={14}
          pressableAreaPadding={10}
        />
      </View>
    </View>
  );
};
