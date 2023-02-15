import React from 'react';
import {CurvedTabBar} from '../svg/curved-tab-bar-svg';
import {View} from '../primitives/view';
import {TAB_BAR_BUTTON_BOTTOM} from '../../constants/tab-bar';
import {IconButton} from '../buttons/icon-button';

export interface MainTabBarProps {
  activeIcon: string;
  onPressHome: () => void;
  onPressFriends: () => void;
}

export const MainTabBar: React.FC<MainTabBarProps> = props => {
  return (
    <>
      <CurvedTabBar />
      <View
        row
        w="full"
        justifyContent="space-around"
        position="absolute"
        bottom={TAB_BAR_BUTTON_BOTTOM}>
        <IconButton
          icon="home"
          color={props.activeIcon === 'home' ? 'primary' : 'disabled'}
          size="md"
          onPress={() => {
            props.onPressHome();
          }}
        />
        <IconButton
          icon="users"
          color={props.activeIcon === 'friends' ? 'primary' : 'disabled'}
          size="md"
          onPress={() => {
            props.onPressFriends();
          }}
        />
      </View>
    </>
  );
};
