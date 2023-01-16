import React from 'react';
import {ThemeColorKey} from '../../providers/theme';
import {Pressable, PressableProps} from '../primitives/pressable';
import {Text} from '../primitives/text';

export interface LinkProps {
  text: string;
  color?: ThemeColorKey;
  onPress: PressableProps['onPress'];
}

export const Link: React.FC<LinkProps> = props => {
  return (
    <Pressable onPress={props.onPress}>
      <Text
        typeFace="klavikaCondensedBoldItalic"
        fontSize="title1"
        color={props.color || 'grayLink'}
        text={props.text}
      />
    </Pressable>
  );
};
