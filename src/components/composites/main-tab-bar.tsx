import React from 'react';
import {StyleSheet} from 'react-native';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-styles';
import {HStack} from '../primitives/h-stack';
import {PressableOpaque} from '../primitives/pressable';
import {CurvedTabBar} from './curved-tab-bar-svg';
import {Icon} from '../primitives/icon';

export interface MainTabBarProperties extends WithThemeStyleProps {
  activeIcon: string;
  onPressHome: () => void;
  onPressBell: () => void;
}

const _MainTabBar: React.FC<MainTabBarProperties> = props => {
  const ss = StyleSheet.create({
    iconStack: {bottom: 70},
  });

  return (
    <>
      <CurvedTabBar />
      <HStack justify="space-around" styles={['w-full', ss.iconStack]}>
        <PressableOpaque
          onPress={() => {
            props.onPressHome();
          }}>
          <Icon
            name="home"
            variant={props.activeIcon === 'home' ? 'primary' : 'disabled'}
            size="lg"
          />
        </PressableOpaque>
        <PressableOpaque
          onPress={() => {
            props.onPressBell();
          }}>
          <Icon
            name="bell"
            variant={props.activeIcon === 'bell' ? 'primary' : 'disabled'}
            size="lg"
          />
        </PressableOpaque>
      </HStack>
    </>
  );
};

export const MainTabBar = withTheme(_MainTabBar);
