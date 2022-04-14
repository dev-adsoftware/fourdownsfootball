import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import Svg, {
  Defs,
  Marker,
  MarkerUnits,
  Path,
  PathProps,
} from 'react-native-svg';

import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {MathExtra} from '../../utilities/math-extra';

export interface PieSlice {
  startDegrees: number;
  endDegrees: number;
}
interface Properties extends InjectedThemeProps {
  slices: PieSlice[];
  arrowDegrees?: number;
  size: number;
  animate?: boolean;
}

const Component: React.FC<Properties> = props => {
  const {slices, arrowDegrees, size, animate = true, theme} = props;

  const [slice0, setSlice0] = React.useState<PieSlice>();
  const [slice1, setSlice1] = React.useState<PieSlice>();
  const [slice2, setSlice2] = React.useState<PieSlice>();
  const [slice3, setSlice3] = React.useState<PieSlice>();

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

  const animationArrow = React.useRef(new Animated.Value(0)).current;
  const arrowPathRef = React.useRef<React.Component<
    PathProps,
    any,
    any
  > | null>(null);

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
    animationPercent.setValue(
      animate &&
        (slices[0].startDegrees !== slice0?.startDegrees ||
          slices[1].startDegrees !== slice1?.startDegrees ||
          slices[2].startDegrees !== slice2?.startDegrees ||
          slices[3].startDegrees !== slice3?.startDegrees)
        ? 0
        : 1,
    );
    animationPercent.addListener(animatedValue => {
      const start1 = 0;
      const end1 = slices[0].startDegrees * animatedValue.value;
      // slices[0].startDegrees +
      // (slices[0].endDegrees - slices[0].startDegrees) * animatedValue.value;
      const start2 = end1;
      const end2 = start2 + slices[1].startDegrees * animatedValue.value;
      // slices[1].startDegrees +
      // (slices[1].endDegrees - slices[1].startDegrees) * animatedValue.value;
      const start3 = end2;
      const end3 = start3 + +slices[2].startDegrees * animatedValue.value;
      // slices[2].startDegrees +
      // (slices[2].endDegrees - slices[2].startDegrees) * animatedValue.value;
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

    animationArrow.setValue(0);
    animationArrow.addListener(animatedValue => {
      if (arrowPathRef && arrowPathRef.current) {
        const arrowCoordinates = getCoordinatesForPercent(animatedValue.value);
        (arrowPathRef as any).current.setNativeProps({
          d: `M 0 0 L ${0.7 * arrowCoordinates[0]} ${
            0.7 * arrowCoordinates[1]
          }`,
        });
      }
    });

    Animated.sequence([
      Animated.timing(animationPercent, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      ...(arrowDegrees
        ? [
            Animated.timing(animationArrow, {
              toValue: 2 + arrowDegrees / 360,
              duration: 500,
              useNativeDriver: true,
              easing: Easing.linear,
              delay: 500,
            }),
          ]
        : []),
    ]).start(({finished}) => {
      animationArrow.removeAllListeners();
      animationPercent.removeAllListeners();
      if (finished) {
        setSlice0(slices[0]);
        setSlice1(slices[1]);
        setSlice2(slices[2]);
        setSlice3(slices[3]);
      }
    });
  }, [
    animationPercent,
    calcPathData,
    slices,
    animationArrow,
    arrowDegrees,
    animate,
    slice0,
    slice1,
    slice2,
    slice3,
  ]);

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

  const startArrowCoordinates = getCoordinatesForPercent(0);

  return (
    <>
      <Svg viewBox="-1 -1 2 2" style={[styles.circle]}>
        <Defs>
          <Marker
            id="Triangle"
            viewBox="0 0 20 10"
            refX="0"
            refY="5"
            markerUnits={'strokeWidth' as MarkerUnits}
            markerWidth="10"
            orient="auto">
            <Path d="M 0 0 L 20 5 L 0 10 z" fill="context-stroke" />
          </Marker>
        </Defs>
        <Path ref={pathRef1} fill={theme.colors.pieChartDarkRed} />
        <Path ref={pathRef2} fill={theme.colors.pieChartRed} />
        <Path ref={pathRef3} fill={theme.colors.pieChartGreen} />
        <Path ref={pathRef4} fill={theme.colors.pieChartLightGreen} />
        {arrowDegrees ? (
          <Path
            ref={arrowPathRef}
            d={`M 0 0 L ${0.7 * startArrowCoordinates[0]} ${
              0.7 * startArrowCoordinates[1]
            }`}
            stroke="black"
            strokeWidth={String(size / (size <= 50 ? 1000 : 1800))}
            markerEnd="url(#Triangle)"
          />
        ) : (
          <></>
        )}
      </Svg>
    </>
  );
};

export const AnimatedPieChart = withTheme(Component);
