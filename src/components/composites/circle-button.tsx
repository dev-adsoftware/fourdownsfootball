import React from 'react';
import {Circle} from '../primitives/circle';
import {Icon} from '../primitives/icon';
import {Pressable, PressableProps} from '../primitives/pressable';
import {VStack} from '../primitives/v-stack';

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
      <Circle h={CIRCLE_SIZE} w={CIRCLE_SIZE} bg="primary">
        <VStack alignItems="center" justifyContent="center" full>
          <Icon name={icon} color="white" />
        </VStack>
      </Circle>
    </Pressable>
  );
};
