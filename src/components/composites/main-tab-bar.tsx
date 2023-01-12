import React from 'react';
import {HStack} from '../primitives/h-stack';
import {Pressable} from '../primitives/pressable';
import {CurvedTabBar} from './curved-tab-bar-svg';
import {Icon} from '../primitives/icon';
import {Container} from '../primitives/container';
import {TAB_BAR_BUTTON_BOTTOM} from '../../constants/tab-bar';

export interface MainTabBarProps {
  activeIcon: string;
  onPressHome: () => void;
  onPressBell: () => void;
}

export const MainTabBar: React.FC<MainTabBarProps> = props => {
  return (
    <>
      <CurvedTabBar />
      <Container bottom={TAB_BAR_BUTTON_BOTTOM}>
        <HStack justifyContent="space-around">
          <Pressable
            opaque
            onPress={() => {
              props.onPressHome();
            }}>
            <Icon
              name="home"
              color={props.activeIcon === 'home' ? 'primary' : 'disabled'}
              size="lg"
            />
          </Pressable>
          <Pressable
            opaque
            onPress={() => {
              props.onPressBell();
            }}>
            <Icon
              name="bell"
              color={props.activeIcon === 'bell' ? 'primary' : 'disabled'}
              size="lg"
            />
          </Pressable>
        </HStack>
      </Container>
    </>
  );
};
