import React from 'react';
import {Animated} from 'react-native';
import {AnimatedIcon} from '../primitives/animated-icon';
import {Rect} from '../primitives/rect';
import {VStack} from '../primitives/v-stack';

export interface SpinnerProps {}

export const Spinner: React.FC<SpinnerProps> = () => {
  const {current: scaleAnimationValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );
  const {current: rotationAnimationValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  React.useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnimationValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimationValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(rotationAnimationValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
      {iterations: -1},
    ).start();
  });

  return (
    <Rect h={40} w={40}>
      <VStack alignItems="center" justifyContent="center">
        <AnimatedIcon
          name="spinner"
          color="primary"
          size="2xl"
          scale={{animatedValue: scaleAnimationValue, range: [0.5, 1]}}
          rotate={{
            animatedValue: rotationAnimationValue,
            range: ['0deg', '720deg'],
          }}
        />
      </VStack>
    </Rect>
  );
};
