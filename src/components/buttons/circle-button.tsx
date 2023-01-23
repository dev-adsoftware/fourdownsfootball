import React from 'react';
import {Icon} from '../primitives/icon';
import {Pressable, PressableProps} from '../primitives/pressable';
import {View} from '../primitives/view';

export interface CircleButtonProperties {
  icon: string;
  onPress: PressableProps['onPress'];
  size?: number;
}

const DEFAULT_CIRCLE_SIZE = 40;

export const CircleButton: React.FC<CircleButtonProperties> = props => {
  const {icon, onPress} = props;

  const circleSize = props.size || DEFAULT_CIRCLE_SIZE;
  const iconSize = circleSize > DEFAULT_CIRCLE_SIZE ? 'lg' : 'md';

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
        bg="primary">
        <Icon name={icon} color="white" size={iconSize} />
      </View>
    </Pressable>
  );
};
