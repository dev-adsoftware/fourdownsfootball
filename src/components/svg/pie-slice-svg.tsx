import React from 'react';
import {Path} from 'react-native-svg';
import {MathExtra} from '../../utilities/math-extra';

interface Properties {
  startPercent: number;
  endPercent: number;
  color: string;
}

// Must be a class component so it can be animated via react-native-reanimated
class Component extends React.Component<Properties> {
  getCoordinatesForPercent = (percent: number) => {
    const x = MathExtra.round(Math.cos(2 * Math.PI * percent), 5);
    const y = MathExtra.round(Math.sin(2 * Math.PI * percent), 5);

    return [x, y];
  };

  render() {
    const [startX, startY] = this.getCoordinatesForPercent(
      this.props.startPercent,
    );
    const [endX, endY] = this.getCoordinatesForPercent(this.props.endPercent);
    const largeArcFlag =
      this.props.endPercent - this.props.startPercent > 0.5 ? 1 : 0;

    const pathData = [
      `M ${startX} ${startY}`,
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'L 0 0',
    ].join(' ');

    return <Path fill={this.props.color} d={pathData} />;
  }
}

export {Component as PieSliceSvg};
