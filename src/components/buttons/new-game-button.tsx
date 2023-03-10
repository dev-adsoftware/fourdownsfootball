import React from 'react';
import {Animated} from 'react-native';
import {TAB_BAR_NEW_GAME_BUTTON_SIZE} from '../../constants';
import {Icon} from '../../primitives/icon';
import {View} from '../../primitives/view';
import {PressableProps} from '../../types';

export interface NewGameButtonProperties extends PressableProps {
  rotated: boolean;
  wrapped: boolean;
  onPress: PressableProps['onPress'];
}

const BORDER_WIDTH = 10;

export const NewGameButton: React.FC<NewGameButtonProperties> = props => {
  const {current: rotationAnimationValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  React.useEffect(() => {
    if (props.rotated) {
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
  }, [props.rotated, rotationAnimationValue]);

  return (
    <View
      onPress={props.onPress}
      flex="none"
      h={
        props.wrapped
          ? TAB_BAR_NEW_GAME_BUTTON_SIZE
          : TAB_BAR_NEW_GAME_BUTTON_SIZE - BORDER_WIDTH * 2
      }
      w={
        props.wrapped
          ? TAB_BAR_NEW_GAME_BUTTON_SIZE
          : TAB_BAR_NEW_GAME_BUTTON_SIZE - BORDER_WIDTH * 2
      }
      m={props.wrapped ? 0 : BORDER_WIDTH}
      alignItems="center"
      justifyContent="center"
      bg="primary"
      overflow="hidden"
      borderWidth={props.wrapped ? BORDER_WIDTH : 0}
      borderColor="navSurface"
      borderRadius="circle">
      <Icon
        animated
        icon="plus"
        size={14}
        color="white"
        animatedRotate={{
          animatedValue: rotationAnimationValue,
          range: ['0deg', '225deg'],
        }}
      />
    </View>
  );
};
