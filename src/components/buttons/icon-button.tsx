import React from 'react';
import {
  ColorProps,
  IconProps as StyleIconProps,
} from '../../utilities/style-builder';
import {Icon, IconProps} from '../primitives/icon';
import {Pressable, PressableProps} from '../primitives/pressable';

export interface IconButtonProps extends ColorProps, StyleIconProps {
  pressableAreaPadding?: number;
  icon: IconProps['name'];
  onPress: PressableProps['onPress'];
}

export const IconButton: React.FC<IconButtonProps> = props => {
  const {icon, onPress} = props;

  return (
    <Pressable
      onPress={e => {
        if (onPress) {
          onPress(e);
        }
      }}
      flex="none"
      alignItems="center"
      justifyContent="center"
      p={props.pressableAreaPadding}>
      <Icon name={icon} color={props.color} size={props.size || 'md'} />
    </Pressable>
  );
};
