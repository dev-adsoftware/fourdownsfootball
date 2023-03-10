import React from 'react';
import {Icon} from '../../primitives/icon';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {GameEngine} from '../../utilities/game-engine';

interface TimeRemainingIndicatorProps {
  timeRemaining: number;
}

const REMAINING_TIME_FONT_SIZE = 12;

export const TimeRemainingIndicator: React.FC<
  TimeRemainingIndicatorProps
> = props => {
  return (
    <View row alignItems="center">
      <Icon icon="stopwatch" color="darkText" size={10} />
      <Text
        pl={5}
        text={GameEngine.formatTime(props.timeRemaining)}
        typeFace="sourceSansProRegular"
        fontSize={REMAINING_TIME_FONT_SIZE}
      />
    </View>
  );
};
