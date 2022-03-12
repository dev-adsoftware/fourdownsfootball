import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import Svg, {Path, PathProps} from 'react-native-svg';

import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {MathExtra} from '../../utilities/math-extra';

export interface PieSlice {
  startDegrees: number;
  endDegrees: number;
  color: string;
}
interface Properties extends InjectedThemeProps {
  slices: PieSlice[];
  size: number;
}

const Component: React.FC<Properties> = props => {
  const {slices, size} = props;

  const animationPercent = React.useRef(new Animated.Value(0)).current;
  const pathRef1 = React.useRef<React.Component<PathProps, any, any> | null>(
    null,
  );
  const pathRef2 = React.useRef<React.Component<PathProps, any, any> | null>(
    null,
  );
  const pathRef3 = React.useRef<React.Component<PathProps, any, any> | null>(
    null,
  );
  const pathRef4 = React.useRef<React.Component<PathProps, any, any> | null>(
    null,
  );

  const getCoordinatesForPercent = (percent: number) => {
    const x = MathExtra.round(Math.cos(2 * Math.PI * percent), 5);
    const y = MathExtra.round(Math.sin(2 * Math.PI * percent), 5);

    return [x, y];
  };

  const calcPathData = React.useCallback(
    (startPercent: number, endPercent: number): string => {
      const [startX, startY] = getCoordinatesForPercent(startPercent);
      const [endX, endY] = getCoordinatesForPercent(endPercent);
      const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;

      const pathData = [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'L 0 0',
      ].join(' ');

      return pathData;
    },
    [],
  );

  React.useEffect(() => {
    animationPercent.setValue(0);
    animationPercent.addListener(animatedValue => {
      const start1 = 0;
      const end1 =
        slices[0].startDegrees +
        (slices[0].endDegrees - slices[0].startDegrees) * animatedValue.value;
      const start2 = end1;
      const end2 =
        start2 +
        slices[1].startDegrees +
        (slices[1].endDegrees - slices[1].startDegrees) * animatedValue.value;
      const start3 = end2;
      const end3 =
        start3 +
        slices[2].startDegrees +
        (slices[2].endDegrees - slices[2].startDegrees) * animatedValue.value;
      const start4 = end3;
      const end4 = 360;

      if (pathRef1 && pathRef1.current) {
        (pathRef1 as any).current.setNativeProps({
          d: calcPathData(start1 / 360, end1 / 360),
        });
      }
      if (pathRef2 && pathRef2.current) {
        (pathRef2 as any).current.setNativeProps({
          d: calcPathData(start2 / 360, end2 / 360),
        });
      }
      if (pathRef3 && pathRef3.current) {
        (pathRef3 as any).current.setNativeProps({
          d: calcPathData(start3 / 360, end3 / 360),
        });
      }
      if (pathRef4 && pathRef4.current) {
        (pathRef4 as any).current.setNativeProps({
          d: calcPathData(start4 / 360, end4 / 360),
        });
      }
    });

    Animated.timing(animationPercent, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      animationPercent.removeAllListeners();
    });
  }, [animationPercent, calcPathData, slices]);

  const styles = StyleSheet.create({
    circle: {
      margin: 10,
      height: size,
      width: size,
      borderWidth: size >= 100 ? 2 : 1,
      borderColor: 'black',
      borderRadius: size / 2,
      transform: [{rotate: '-90deg'}],
    },
  });

  return (
    <>
      <Svg viewBox="-1 -1 2 2" style={[styles.circle]}>
        <Path ref={pathRef1} fill={slices[0].color} />
        <Path ref={pathRef2} fill={slices[1].color} />
        <Path ref={pathRef3} fill={slices[2].color} />
        <Path ref={pathRef4} fill={slices[3].color} />
      </Svg>
      <Svg viewBox="0 0 200 200" style={{backgroundColor: 'gray'}}>
        <Path d="M 0 0 L 10 0" strokeWidth="5" />
      </Svg>
    </>
  );
};

export const AnimatedPieChart = withTheme(Component);
