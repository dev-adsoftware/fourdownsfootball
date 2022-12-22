import {omit} from 'lodash';
import React from 'react';
import {Animated, TextInputProps, TextInput as RNTextInput} from 'react-native';
import {AnimatedText} from '../primitives/animated-text';
import {PressableOpaque} from '../primitives/pressable';
import {TextInput} from '../primitives/text-input';

export interface InputProperties
  extends Omit<TextInputProps, 'placeholder' | 'placeholderTextColor'> {
  label?: string;
  hasError?: boolean;
}

const _Label: React.FC<{
  text: string;
  labeled: Animated.Value;
  hasError?: boolean;
}> = props => {
  const {text, labeled, hasError} = props;
  return (
    <AnimatedText
      text={text}
      styles={['p-x-xs', 'input-label', hasError ? 'c-error' : undefined]}
      transforms={[
        {
          translateY: labeled.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 8],
          }),
        },
        {
          translateX: labeled.interpolate({
            inputRange: [0, 1],
            outputRange: [8, 3],
          }),
        },
        {
          scale: labeled.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.8],
          }),
        },
      ]}
    />
  );
};

export const Input: React.FC<InputProperties> = props => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isTextInputVisible, setIsTextInputVisible] = React.useState(false);

  const {current: labeled} = React.useRef<Animated.Value>(
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
      Animated.timing(labeled, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else if (!props.value) {
      Animated.timing(labeled, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused, labeled, props.value]);

  return (
    <PressableOpaque
      styles={[
        'input-border',
        props.hasError ? 'input-border-error' : undefined,
      ]}
      onPress={() => {
        setIsFocused(true);
        forceFocus();
      }}>
      <_Label
        text={props.label || ''}
        labeled={labeled}
        hasError={props.hasError}
      />
      <TextInput
        {...omit(props, 'placeholder')}
        innerRef={(ref: RNTextInput) => {
          root.current = ref;
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        styles={[
          'p-x-md',
          isTextInputVisible ? 'opaque-100' : 'opaque-0',
          'input',
        ]}
      />
    </PressableOpaque>
  );
};
