import React from 'react';
import {Icon} from '../../primitives/icon';
import {View} from '../../primitives/view';
import {TimeRemainingIndicator} from './time-remaining-indicator';

interface OpponentToolbarProps {
  timeRemaining: number;
  onPressHuddleButton: () => void;
}

export const OpponentToolbar: React.FC<OpponentToolbarProps> = props => {
  return (
    <View
      row
      alignItems="center"
      justifyContent="space-between"
      py={5}
      w="full"
      bg="oddLayerSurface"
      borderBottomColor="separator"
      borderBottomWidth={1}>
      <View pl={15}>
        <TimeRemainingIndicator timeRemaining={props.timeRemaining} />
      </View>
      <View flex={1} bg="evenLayerSurface" />
      <View
        row
        onPress={props.onPressHuddleButton}
        justifyContent="space-between"
        bg="primary"
        px={15}
        py={3}
        mr={5}
        borderRadius={3}>
        <Icon icon="users" color="white" size={10} />
        <View w={4} />
        <Icon icon="caret-down" color="white" size={10} />
      </View>
    </View>
  );
};
