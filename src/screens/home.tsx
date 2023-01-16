import React from 'react';
import {CircleAbbrAvatar} from '../components/avatars/circle-abbr-avatar';
import {IconButton} from '../components/buttons/icon-button';
import {SafeBar} from '../components/primitives/safe-bar';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {useData} from '../providers/data';

interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const data = useData();

  return (
    <>
      <SafeBar />
      <View bg="oddLayerSurface">
        <View row flex="none" bg="white" h={75}>
          <View flex="none" w={75} alignItems="center" justifyContent="center">
            <CircleAbbrAvatar text="K" />
          </View>
          <View>
            <View row px={0} alignItems="flex-end">
              <Text
                text="WELCOME,"
                typeFace="klavikaCondensedBold"
                fontSize="callout"
              />
            </View>
            <View row px={0} alignItems="flex-start">
              <Text
                text={`${data.owner?.firstName.toUpperCase()}!`}
                typeFace="klavikaCondensedBold"
                fontSize="title1"
                lineHeight={28}
              />
            </View>
          </View>
          <View
            flex="none"
            w={75}
            pt={20}
            alignItems="center"
            justifyContent="flex-start">
            <IconButton
              onPress={() => {
                console.log('pressed user settings');
              }}
              icon="cog"
              color="primaryText"
            />
          </View>
        </View>
      </View>
    </>
  );
};
