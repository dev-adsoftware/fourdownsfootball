import React from 'react';
import {Animated} from 'react-native';
import {View} from '../../primitives/view';

interface ToggleButtonProps {
  isOn: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = props => {
  const slideX = React.useRef<Animated.Value>(
    new Animated.Value(props.isOn ? 1 : 0),
  ).current;

  React.useEffect(() => {
    if (props.isOn) {
      Animated.timing(slideX, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {});
    } else {
      Animated.timing(slideX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {});
    }
  }, [props.isOn, slideX]);

  return (
    <View
      borderRadius="circle"
      w={30}
      h={20}
      bg={props.isOn ? 'primary' : 'disabled'}
      justifyContent="center"
      px={3}>
      <View
        animated
        borderRadius="circle"
        w={15}
        h={15}
        bg="white"
        animatedTranslateX={{animatedValue: slideX, range: [0, 10]}}
      />
    </View>
  );
};
