import React from 'react';
import {ViewProps as StyleViewProps} from '../../utilities/style-builder';
import {Icon, IconProps} from '../../primitives/icon';
import {View} from '../../primitives/view';

export interface CircleIconBadgeProps
  extends IconProps,
    Pick<StyleViewProps, 'bg' | 'borderColor' | 'borderWidth'> {}

export const CircleIconBadge: React.FC<CircleIconBadgeProps> = props => {
  const circleSize = (props.size || 0) * 4;

  return (
    <View
      flex="none"
      alignItems="center"
      justifyContent="center"
      h={circleSize}
      w={circleSize}
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
