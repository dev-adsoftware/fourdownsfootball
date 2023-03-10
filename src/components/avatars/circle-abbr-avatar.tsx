import React from 'react';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';

export interface CircleAbbrAvatarProps {
  text: string;
  size?: number;
}

export const CircleAbbrAvatar: React.FC<CircleAbbrAvatarProps> = props => {
  return (
    <View
      alignItems="center"
      justifyContent="center"
      h={props.size || 50}
      w={props.size || 50}
      borderRadius="circle"
      bg="primary">
      <Text
        text={props.text}
        color="white"
        fontSize={props.text.length === 1 ? 34 : 30}
      />
    </View>
  );
};
