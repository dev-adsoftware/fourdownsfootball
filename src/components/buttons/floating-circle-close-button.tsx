import React from 'react';
import {SAFE_AREA_PADDING_BOTTOM} from '../../constants';
import {View} from '../../primitives/view';
import {CircleIconButton} from './circle-icon-button';

interface FloatingCircleCloseButtonProps {
  onPress: () => void;
}

const BUTTON_SIZE = 16;

export const FloatingCircleCloseButton: React.FC<
  FloatingCircleCloseButtonProps
> = props => {
  return (
    <View
      position="absolute"
      bottom={SAFE_AREA_PADDING_BOTTOM}
      right={20}
      w={75}
      h={75}
      alignItems="center"
      justifyContent="center">
      <CircleIconButton
        icon="times"
        onPress={props.onPress}
        size={BUTTON_SIZE}
      />
    </View>
  );
};
