import React from 'react';
import {IconProps as StyleIconProps} from '../../utilities/style-builder';
import {Icon, IconProps} from '../../primitives/icon';
import {PressableProps} from '../../types';
import {View} from '../../primitives/view';

export interface IconButtonProps
  extends IconProps,
    PressableProps,
    StyleIconProps {
  pressableAreaPadding?: number;
}

export const IconButton: React.FC<IconButtonProps> = props => {
  return (
    <View
      onPress={props.onPress}
      opaque={props.opaque}
      flex="none"
      alignItems="center"
      justifyContent="center"
      p={props.pressableAreaPadding}
      m={props.pressableAreaPadding ? -props.pressableAreaPadding : undefined}>
      <Icon icon={props.icon} color={props.color} size={props.size} />
    </View>
  );
};
