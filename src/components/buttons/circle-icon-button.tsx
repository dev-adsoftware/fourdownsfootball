import React from 'react';
import {ViewProps as StyleViewProps} from '../../utilities/style-builder';
import {Icon, IconProps} from '../../primitives/icon';
import {View} from '../../primitives/view';
import {PressableProps} from '../../types';

export interface CircleButtonProperties
  extends IconProps,
    PressableProps,
    Pick<StyleViewProps, 'bg' | 'borderColor'> {}

export const CircleIconButton: React.FC<CircleButtonProperties> = props => {
  const circleSize = (props.size || 0) * 4;

  return (
    <View
      onPress={props.onPress}
      opaque={props.opaque}
      flex="none"
      alignItems="center"
      justifyContent="center"
      h={circleSize}
      w={circleSize}
      borderRadius="circle"
      borderWidth={props.borderColor && 1}
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
