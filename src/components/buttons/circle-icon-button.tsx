import React from 'react';
import {
  BorderProps,
  ColorProps,
  ViewProps,
} from '../../utilities/style-builder';
import {Icon} from '../primitives/icon';
import {Pressable, PressableProps} from '../primitives/pressable';
import {View} from '../primitives/view';

export interface CircleButtonProperties {
  icon: string;
  onPress: PressableProps['onPress'];
  size?: number;
  bg?: ViewProps['bg'];
  color?: ColorProps['color'];
  borderColor?: BorderProps['borderColor'];
}

const DEFAULT_CIRCLE_SIZE = 40;
const SMALL_CIRCLE_SIZE = 30;

export const CircleIconButton: React.FC<CircleButtonProperties> = props => {
  const {icon, onPress} = props;

  const circleSize = props.size || DEFAULT_CIRCLE_SIZE;
  const iconSize =
    circleSize > DEFAULT_CIRCLE_SIZE
      ? 'lg'
      : circleSize > SMALL_CIRCLE_SIZE
      ? 'md'
      : '3xs';

  return (
    <Pressable
      onPress={e => {
        if (onPress) {
          onPress(e);
        }
      }}>
      <View
        flex="none"
        alignItems="center"
        justifyContent="center"
        h={circleSize}
        w={circleSize}
        borderRadius="circle"
        borderWidth={props.borderColor && 1}
        borderColor={props.borderColor}
        bg={props.bg || 'primary'}>
        <Icon name={icon} color={props.color || 'white'} size={iconSize} />
      </View>
    </Pressable>
  );
};
