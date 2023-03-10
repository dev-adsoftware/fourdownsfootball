import React from 'react';
import {View} from '../../primitives/view';
import {BackgroundProps} from '../../utilities/style-builder';

interface HorizontalSeparatorProps {
  thickness?: number;
  margin?: number;
  color?: BackgroundProps['bg'];
}

const DEFAULT_THICKNESS = 1;
const DEFAULT_MARGIN = 2;

export const HorizontalSeparator: React.FC<
  HorizontalSeparatorProps
> = props => {
  return (
    <View
      h={props.thickness === undefined ? DEFAULT_THICKNESS : props.thickness}
      my={props.margin === undefined ? DEFAULT_MARGIN : props.margin}
      bg={props.color ? props.color : 'separator'}
    />
  );
};
