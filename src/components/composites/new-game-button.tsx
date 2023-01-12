import React from 'react';
import {Animated, useWindowDimensions} from 'react-native';
import {TAB_BAR_HEIGHT} from '../../constants/tab-bar';
import {AnimatedIcon} from '../primitives/animated-icon';
import {Circle} from '../primitives/circle';
import {Container} from '../primitives/container';
import {Pressable, PressableProps} from '../primitives/pressable';
import {VStack} from '../primitives/v-stack';

export interface NewGameButtonProperties {
  rotated: boolean;
  wrapped: boolean;
  onPress: PressableProps['onPress'];
}

const WRAPPED_SIZE = 70;
const PLAIN_SIZE = 50;

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

  // const ss = StyleSheet.create({
  //   s: {
  //     position: 'absolute',
  //     width: size,
  //     height: size,
  //     borderRadius: size / 2,
  //     left: width / 2 - size / 2,
  //     bottom: TAB_BAR_HEIGHT - size - (wrapped ? 0 : 10),
  //     borderColor: '#ffffff',
  //     borderWidth: wrapped ? 10 : 0,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  // });

  return (
    <Container
      position="absolute"
      // bg="secondary"
      w={size}
      h={size}
      left={width / 2 - size / 2}
      bottom={TAB_BAR_HEIGHT - size - (wrapped ? 0 : 10)}>
      <Pressable
        onPress={e => {
          if (onPress) {
            onPress(e);
          }
        }}>
        <Circle
          h={size}
          w={size}
          bg="primary"
          borderWidth={wrapped ? 'md' : 'none'}
          borderColor="navSurface">
          <VStack full alignItems="center" justifyContent="center">
            <AnimatedIcon
              name="plus"
              size="xl"
              rotate={{
                animatedValue: rotationAnimationValue,
                range: ['0deg', '135deg'],
              }}
            />
          </VStack>
        </Circle>
      </Pressable>
    </Container>
  );
};
