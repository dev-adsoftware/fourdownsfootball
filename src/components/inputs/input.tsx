import {omit} from 'lodash';
import React from 'react';
import {
  Animated,
  TextInputProps,
  TextInput as RNTextInput,
  LayoutChangeEvent,
} from 'react-native';
import {MathExtra} from '../../utilities/math-extra';
import {View} from '../primitives/view';
import {Pressable} from '../primitives/pressable';
import {Text} from '../primitives/text';
import {TextInput} from '../primitives/text-input';

export interface InputProperties
  extends Omit<
    TextInputProps,
    'placeholder' | 'placeholderTextColor' | 'selectionColor' | 'opacity'
  > {
  label?: string;
  hasError?: boolean;
}

const LABEL_INITIAL_X = 12;
const LABEL_INITIAL_Y = 17;
const LABEL_SCALE = 0.8;
const INPUT_HEIGHT = 60;

export const Input: React.FC<InputProperties> = props => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isTextInputVisible, setIsTextInputVisible] = React.useState(false);
  const [labelXOffset, setLabelXOffset] = React.useState(0);
  const [labelYOffset, setLabelYOffset] = React.useState(0);

  const {current: labelAnimatedValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  const root = React.useRef<RNTextInput | undefined | null>();
  const forceFocus = () => {
    root.current?.focus();
  };

  const timer = React.useRef<NodeJS.Timeout | undefined>();
  React.useEffect(() => {
    if (isFocused) {
      timer.current = setTimeout(
        () => setIsTextInputVisible(true),
        100,
      ) as unknown as NodeJS.Timeout;
    } else if (!props.value) {
      setIsTextInputVisible(false);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [isFocused, props.value]);

  React.useEffect(() => {
    if (isFocused) {
      Animated.timing(labelAnimatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else if (!props.value) {
      Animated.timing(labelAnimatedValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused, labelAnimatedValue, props.value]);

  return (
    <Pressable
      opaque
      onPress={() => {
        setIsFocused(true);
        forceFocus();
      }}>
      <View
        flex="none"
        borderWidth={1}
        borderColor={isFocused ? 'primary' : 'inputBorder'}
        borderRadius={8}
        h={INPUT_HEIGHT}>
        <View
          animated
          position="absolute"
          top={LABEL_INITIAL_Y}
          left={LABEL_INITIAL_X}
          h={INPUT_HEIGHT}
          w="full"
          onLayout={(e: LayoutChangeEvent) => {
            const layout = e.nativeEvent.layout;
            const computedLabelXOffset = MathExtra.round(
              -1 * (layout.width / 2 - (LABEL_SCALE * layout.width) / 2),
            );
            const computedLabelYOffset = MathExtra.round(
              -1 * (layout.height / 2 - (LABEL_SCALE * layout.height) / 2),
            );
            setLabelXOffset(computedLabelXOffset);
            setLabelYOffset(computedLabelYOffset);
          }}
          animatedTranslateY={{
            animatedValue: labelAnimatedValue,
            range: [0, labelYOffset - LABEL_INITIAL_Y + 4],
          }}
          animatedTranslateX={{
            animatedValue: labelAnimatedValue,
            range: [0, labelXOffset],
          }}
          animatedScale={{
            animatedValue: labelAnimatedValue,
            range: [1, LABEL_SCALE],
          }}>
          <View alignItems="flex-start" justifyContent="flex-start">
            <Text
              text={props.label || ''}
              color={props.hasError ? 'error' : 'placeholder'}
              fontSize="headline"
            />
          </View>
        </View>
        <View mt={25} ml={12}>
          <TextInput
            {...omit(props, ['onFocus', 'onBlur', 'opacity'])}
            innerRef={(ref: RNTextInput) => {
              root.current = ref;
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            opacity={isTextInputVisible ? 1 : 0}
          />
        </View>
      </View>
    </Pressable>
  );
};
