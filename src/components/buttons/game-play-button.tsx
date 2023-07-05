import React from 'react';
import {View} from '../../primitives/view';
import {ViewProps} from '../../utilities/style-builder';
import {CircleIconButton, CircleIconButtonProps} from './circle-icon-button';

interface GamePlayButtonProps
  extends Pick<ViewProps, 'top' | 'left' | 'right' | 'bottom'>,
    Pick<CircleIconButtonProps, 'icon' | 'onPress'> {
  disabled?: boolean;
}

export const GamePlayButton: React.FC<GamePlayButtonProps> = props => {
  return (
    <View
      position="absolute"
      top={props.top}
      left={props.left}
      right={props.right}
      bottom={props.bottom}
      w={40}
      h={40}
      alignItems="center"
      justifyContent="center">
      <CircleIconButton
        disabled={props.disabled}
        icon={props.icon}
        onPress={props.onPress}
        size={10}
        borderColor="black"
        borderWidth={1}
        bg="transparentVeryDark"
        color={props.disabled ? 'disabledDark' : 'white'}
      />
    </View>
  );
};
