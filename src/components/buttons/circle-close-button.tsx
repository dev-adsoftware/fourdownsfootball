import React from 'react';
import {PressableProps} from '../../types';
import {CircleIconButton} from './circle-icon-button';

interface CircleCloseButtonProps extends Pick<PressableProps, 'onPress'> {}

export const CircleCloseButton: React.FC<CircleCloseButtonProps> = props => {
  return (
    <CircleIconButton
      icon="times"
      bg="lightGrayButton"
      color="black"
      size={8}
      onPress={props.onPress}
    />
  );
};
