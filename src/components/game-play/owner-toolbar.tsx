import React from 'react';
import {View} from '../../primitives/view';
import {useTheme} from '../../providers/theme';
import {IconButton} from '../buttons/icon-button';
import {ProgressBar} from '../progress-indicators/progress-bar';
import {TimeRemainingIndicator} from './time-remaining-indicator';

interface OwnerToolbarProps {
  timeRemaining: number;
  momentum: number;
}

export const OwnerToolbar: React.FC<OwnerToolbarProps> = props => {
  const theme = useTheme();
  return (
    <View
      row
      alignItems="center"
      justifyContent="space-between"
      py={5}
      w="full"
      bg="oddLayerSurface"
      borderTopColor="separator"
      borderTopWidth={1}>
      <View pl={15}>
        <TimeRemainingIndicator timeRemaining={props.timeRemaining} />
      </View>
      <View flex={1} bg="evenLayerSurface" />
      <View>
        <IconButton
          icon="tachometer-alt"
          color="darkText"
          size={10}
          onPress={() => {}}
        />
      </View>
      <View pl={5} pr={15}>
        <ProgressBar
          unfilledColor="black"
          filledColor={theme.getRedGreenGradient(props.momentum)}
          percentComplete={props.momentum}
          height={12}
        />
      </View>
    </View>
  );
};
