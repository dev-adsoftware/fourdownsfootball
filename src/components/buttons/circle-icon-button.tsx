import React from 'react';
import {ViewProps as StyleViewProps} from '../../utilities/style-builder';
import {Icon, IconProps} from '../../primitives/icon';
import {View} from '../../primitives/view';
import {PressableProps} from '../../types';

export interface CircleIconButtonProps
  extends IconProps,
    PressableProps,
    Pick<StyleViewProps, 'bg' | 'borderColor' | 'borderWidth'> {
  offsetPadding?: number;
  disabled?: boolean;
}

export const CircleIconButton: React.FC<CircleIconButtonProps> = props => {
  const circleSize = (props.size || 0) * 4;

  return (
    <View
      onPress={props.disabled ? undefined : props.onPress}
      opaque={props.disabled ? undefined : props.opaque}
      flex="none"
      alignItems="center"
      justifyContent="center"
      h={circleSize}
      w={circleSize}
      pl={props.offsetPadding || 0}
      borderRadius="circle"
      borderWidth={props.borderColor && (props.borderWidth || 1)}
      borderColor={props.borderColor}
      bg={props.bg || 'primary'}>
      <Icon
        icon={props.icon}
        color={props.color || 'white'}
        size={props.size}
      />
    </View>
  );
};
