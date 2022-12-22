import {omit} from 'lodash';
import React from 'react';
import {PressableProps, Pressable as RNPressable} from 'react-native';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-theme';

export interface PressableProperties
  extends WithThemeStyleProps,
    Omit<PressableProps, 'style'> {}

const Component: React.FC<PressableProperties> = props => {
  return (
    <RNPressable {...omit(props, 'children')}>{props.children}</RNPressable>
  );
};

export const Pressable = withTheme(Component, true);
export const PressableOpaque = withTheme(Component);
