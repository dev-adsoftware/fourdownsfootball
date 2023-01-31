import React from 'react';
import {Pressable, PressableProps} from '../primitives/pressable';
import {Text, TextProps} from '../primitives/text';
import {View} from '../primitives/view';

export interface TextButtonProps extends TextProps {
  onPress: PressableProps['onPress'];
}

export const TextButton: React.FC<TextButtonProps> = props => {
  return (
    <View w="full" py={5} bg="primary" borderRadius="circle">
      <Pressable
        onPress={e => {
          if (props.onPress) {
            props.onPress(e);
          }
        }}
        flex="none"
        alignItems="center"
        justifyContent="center">
        <Text
          text={props.text}
          color={props.color || 'white'}
          typeFace="klavikaCondensedBoldItalic"
          fontSize="title3"
        />
      </Pressable>
    </View>
  );
};
