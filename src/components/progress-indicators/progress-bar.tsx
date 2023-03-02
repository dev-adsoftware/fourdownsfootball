import React from 'react';
import {View} from '../primitives/view';

interface ProgressBarProps {
  percentComplete: number;
  filledColor: string;
  unfilledColor: string;
  width?: number;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = props => {
  return (
    <View
      row
      alignItems="center"
      w={props.width || 100}
      h={props.height || 20}
      overflow="hidden"
      customBg={props.unfilledColor}
      borderWidth={1}
      borderColor="separator"
      borderRadius={(props.height || 20) / 2}>
      <View
        customBg={props.filledColor}
        h={props.height || 20}
        w={((props.width || 100) * props.percentComplete) / 100}
        borderTopLeftRadius={(props.height || 20) / 2}
        borderBottomLeftRadius={(props.height || 20) / 2}
        borderTopRightRadius={
          props.percentComplete === 100 ? (props.height || 20) / 2 : 0
        }
        borderBottomRightRadius={
          props.percentComplete === 100 ? (props.height || 20) / 2 : 0
        }
      />
    </View>
  );
};
