import React from 'react';
import {Text} from '../../primitives/text';
import {PressableProps} from '../../types';
import {ColorProps} from '../../utilities/style-builder';

export interface LinkProps extends PressableProps, ColorProps {
  text: string | number;
}

export const Link: React.FC<LinkProps> = props => {
  return (
    <Text
      onPress={props.onPress}
      typeFace="klavikaCondensedBoldItalic"
      fontSize={22}
      color={props.color || 'grayLink'}
      text={props.text}
    />
  );
};
