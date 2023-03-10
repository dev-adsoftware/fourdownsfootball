import React from 'react';
import {View} from '../../primitives/view';
import {IconButton} from '../buttons/icon-button';
import {useFadeInScreen} from '../navigation/fade-in-screen';

interface GameDetailFooterProps {}

export const GameDetailFooter: React.FC<GameDetailFooterProps> = _props => {
  const {pop: popFadeInScreen} = useFadeInScreen();
  return (
    <View row justifyContent="space-between" bg="white" px={20} pb={30} pt={10}>
      <View mt={4}>
        <IconButton
          icon="cogs"
          color="primary"
          size={14}
          pressableAreaPadding={20}
          onPress={() => {
            popFadeInScreen();
          }}
        />
      </View>
      <View>
        <IconButton
          icon="times"
          color="primary"
          size={18}
          pressableAreaPadding={20}
          onPress={() => {
            popFadeInScreen();
          }}
        />
      </View>
    </View>
  );
};
