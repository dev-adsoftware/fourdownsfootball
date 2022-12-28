import React from 'react';
import {Animated, StyleSheet, useWindowDimensions} from 'react-native';
import {AnimatedIcon} from '../primitives/animated-icon';
import {Pressable, PressableProperties} from '../primitives/pressable';

export interface NewGameButtonProperties {
  rotated: boolean;
  wrapped: boolean;
  onPress: PressableProperties['onPress'];
}

const WRAPPED_SIZE = 70;
const PLAIN_SIZE = 50;
const TAB_BAR_HEIGHT = 105;

export const NewGameButton: React.FC<NewGameButtonProperties> = props => {
  const {rotated, wrapped, onPress} = props;

  const {width} = useWindowDimensions();

  const size = wrapped ? WRAPPED_SIZE : PLAIN_SIZE;

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

  const ss = StyleSheet.create({
    s: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      left: width / 2 - size / 2,
      bottom: TAB_BAR_HEIGHT - size - (wrapped ? 0 : 10),
      borderColor: '#ffffff',
      borderWidth: wrapped ? 10 : 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <Pressable
      styles={[ss.s, 'bg-primary', 'c-contrast']}
      onPress={e => {
        if (onPress) {
          onPress(e);
        }
      }}>
      <AnimatedIcon
        name="plus"
        variant="primary-contrast"
        size="md"
        transforms={[
          {
            rotate: rotationAnimationValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '135deg'],
            }),
          },
        ]}
      />
    </Pressable>
  );
};
