import React from 'react';
import {Icon} from '../primitives/icon';
import {Pressable, PressableProps} from '../primitives/pressable';
import {View} from '../primitives/view';

export interface CircleButtonProperties {
  icon: string;
  onPress: PressableProps['onPress'];
}

const CIRCLE_SIZE = 40;

export const CircleButton: React.FC<CircleButtonProperties> = props => {
  const {icon, onPress} = props;

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
        h={CIRCLE_SIZE}
        w={CIRCLE_SIZE}
        borderRadius="circle"
        bg="primary">
        <Icon name={icon} color="white" />
      </View>
    </Pressable>
  );
};
