import React from 'react';
import {Pressable, PressableProperties} from '../primitives/pressable';
import {Text} from '../primitives/text';

export interface LinkProperties {
  text: string;
  onPress: PressableProperties['onPress'];
  variant?: 'primary' | 'gray';
}

export const Link: React.FC<LinkProperties> = props => {
  return (
    <Pressable onPress={props.onPress}>
      <Text
        styles={[
          !props.variant || props.variant === 'primary'
            ? 'c-primary-lt'
            : 'c-gray',
          'link',
        ]}
        text={props.text}
      />
    </Pressable>
  );
};
