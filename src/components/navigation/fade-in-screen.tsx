import React from 'react';
import {Animated, PressableProps} from 'react-native';
import {SAFE_AREA_PADDING_BOTTOM} from '../../constants/safe-area';
import {CircleButton} from '../buttons/circle-button';
import {View} from '../primitives/view';

interface FadeInScreenProps {
  isVisible: boolean;
  onClose: PressableProps['onPress'];
  children: React.ReactNode;
}

export const FadeInScreen: React.FC<FadeInScreenProps> = props => {
  const {current: screenOpacityAnimatedValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  React.useEffect(() => {
    if (props.isVisible) {
      Animated.timing(screenOpacityAnimatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(screenOpacityAnimatedValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [props.isVisible, screenOpacityAnimatedValue]);

  return (
    <View
      animated
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex="top"
      opacity={0.0}
      bg="transparentMedium"
      animatedOpacity={{
        animatedValue: screenOpacityAnimatedValue,
        range: [0, 1.0],
      }}>
      {props.children}
      <View
        position="absolute"
        bottom={SAFE_AREA_PADDING_BOTTOM}
        right={20}
        w={75}
        h={75}
        alignItems="center"
        justifyContent="center">
        <CircleButton
          icon="times"
          onPress={e => {
            props.onClose && props.onClose(e);
          }}
          size={60}
        />
      </View>
    </View>
  );
};
