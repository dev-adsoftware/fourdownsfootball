import React from 'react';
import {Icon, IconProperties} from '../primitives/icon';
import {Pressable, PressableProperties} from '../primitives/pressable';

export interface CircleButtonProperties {
  icon: string;
  variant: IconProperties['variant'];
  size: IconProperties['size'];
  onPress: PressableProperties['onPress'];
}

export const CircleButton: React.FC<CircleButtonProperties> = props => {
  const {icon, onPress} = props;

  return (
    <Pressable
      styles={[
        props.variant === 'primary-contrast'
          ? 'circle-primary-solid-md'
          : 'circle-invisible-md',
      ]}
      onPress={e => {
        if (onPress) {
          onPress(e);
        }
      }}>
      <Icon name={icon} variant={props.variant} size="md" />
    </Pressable>
  );
};
