import React from 'react';
import {Animated} from 'react-native';
import {
  AnimatedIcon,
  AnimatedIconProperties,
} from '../primitives/animated-icon';
import {Container} from '../primitives/container';

export interface SpinnerProperties {
  variant: AnimatedIconProperties['variant'];
  size: AnimatedIconProperties['size'];
}

export const Spinner: React.FC<SpinnerProperties> = props => {
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
    <Container
      styles={[
        props.variant === 'primary-contrast'
          ? 'circle-primary-solid-md'
          : 'circle-invisible-md',
      ]}>
      <AnimatedIcon
        name="spinner"
        variant={props.variant}
        size="md"
        transforms={[
          {
            scale: scaleAnimationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 2],
            }),
          },
          {
            rotate: rotationAnimationValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '720deg'],
            }),
          },
        ]}
      />
    </Container>
  );
};
