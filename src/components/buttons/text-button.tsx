import React from 'react';
import {Text, TextProps} from '../../primitives/text';
import {View} from '../../primitives/view';
import {PressableProps} from '../../types';

export interface TextButtonProps
  extends Omit<TextProps, 'onPress'>,
    PressableProps {}

export const TextButton: React.FC<TextButtonProps> = props => {
  return (
    <View
      w="full"
      py={5}
      bg="primary"
      borderRadius="circle"
      alignItems="center"
      justifyContent="center"
      onPress={props.onPress}>
      <Text
        text={props.text}
        color={props.color || 'white'}
        typeFace="klavikaCondensedBoldItalic"
        fontSize={20}
      />
    </View>
  );
};
