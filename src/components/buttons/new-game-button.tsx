import React from 'react';
import {Animated} from 'react-native';
import {Icon} from '../primitives/icon';
import {Pressable, PressableProps} from '../primitives/pressable';

export interface NewGameButtonProperties {
  size: number;
  rotated: boolean;
  wrapped: boolean;
  onPress: PressableProps['onPress'];
}

const BORDER_WIDTH = 10;

export const NewGameButton: React.FC<NewGameButtonProperties> = props => {
  const {rotated, wrapped, onPress} = props;

  const {current: rotationAnimationValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  React.useEffect(() => {
    if (rotated) {
      Animated.timing(rotationAnimationValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(rotationAnimationValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [rotated, rotationAnimationValue]);

  return (
    <Pressable
      onPress={e => {
        if (onPress) {
          onPress(e);
        }
      }}
      flex="none"
      h={wrapped ? props.size : props.size - BORDER_WIDTH * 2}
      w={wrapped ? props.size : props.size - BORDER_WIDTH * 2}
      m={wrapped ? 0 : BORDER_WIDTH}
      alignItems="center"
      justifyContent="center"
      bg="primary"
      borderWidth={wrapped ? BORDER_WIDTH : 0}
      borderColor="navSurface"
      borderRadius="circle">
      <Icon
        animated
        name="plus"
        size="xl"
        color="white"
        animatedRotate={{
          animatedValue: rotationAnimationValue,
          range: ['0deg', '135deg'],
        }}
      />
    </Pressable>
  );
};
