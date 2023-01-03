import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import Svg, {
  Defs,
  Marker,
  MarkerUnits,
  Path,
  PathProps,
} from 'react-native-svg';

import {InjectedThemeProps, withTheme} from '../../hoc/with-styles';
import {MathExtra} from '../../utilities/math-extra';
interface Properties extends InjectedThemeProps {
  slices: {
    darkRedSlice: number;
    redSlice: number;
    greenSlice: number;
    lightGreenSlice: number;
  };
  finalSlices?: {
    darkRedSlice: number;
    redSlice: number;
    greenSlice: number;
    lightGreenSlice: number;
  };
  arrowDegrees?: number;
  size: number;
}

const Component: React.FC<Properties> = props => {
  const {slices, finalSlices, arrowDegrees, size, theme} = props;

  const [showArrow, setShowArrow] = React.useState(false);

  const animationPercent = React.useRef(new Animated.Value(0)).current;
  const darkRedPathRef = React.useRef<React.Component<
    PathProps,
    any,
    any
  > | null>(null);
  const redPathRef = React.useRef<React.Component<PathProps, any, any> | null>(
    null,
  );
  const greenPathRef = React.useRef<React.Component<
    PathProps,
    any,
    any
  > | null>(null);
  const lightGreenPathRef = React.useRef<React.Component<
    PathProps,
    any,
    any
  > | null>(null);

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
    setShowArrow(false);
    if (finalSlices) {
      animationPercent.setValue(0);
    } else {
      animationPercent.setValue(1);
    }

    animationPercent.addListener(animatedValue => {
      const start1 = 0;
      const end1 =
        slices.darkRedSlice +
        ((finalSlices ? finalSlices.darkRedSlice : slices.darkRedSlice) -
          slices.darkRedSlice) *
          animatedValue.value;
      const start2 = end1;
      const end2 =
        start2 +
        slices.redSlice +
        ((finalSlices ? finalSlices.redSlice : slices.redSlice) -
          slices.redSlice) *
          animatedValue.value;
      const start3 = end2;
      const end3 =
        start3 +
        slices.greenSlice +
        ((finalSlices ? finalSlices.greenSlice : slices.greenSlice) -
          slices.greenSlice) *
          animatedValue.value;
      const start4 = end3;
      const end4 = 360;

      if (darkRedPathRef && darkRedPathRef.current) {
        (darkRedPathRef as any).current.setNativeProps({
          d: calcPathData(start1 / 360, end1 / 360),
        });
      }
      if (redPathRef && redPathRef.current) {
        (redPathRef as any).current.setNativeProps({
          d: calcPathData(start2 / 360, end2 / 360),
        });
      }
      if (greenPathRef && greenPathRef.current) {
        (greenPathRef as any).current.setNativeProps({
          d: calcPathData(start3 / 360, end3 / 360),
        });
      }
      if (lightGreenPathRef && lightGreenPathRef.current) {
        (lightGreenPathRef as any).current.setNativeProps({
          d: calcPathData(start4 / 360, end4 / 360),
        });
      }
    });

    if (arrowDegrees) {
      animationArrow.setValue(0);

      animationArrow.addListener(animatedValue => {
        if (arrowPathRef && arrowPathRef.current) {
          const arrowCoordinates = getCoordinatesForPercent(
            animatedValue.value,
          );
          (arrowPathRef as any).current.setNativeProps({
            d: `M 0 0 L ${0.7 * arrowCoordinates[0]} ${
              0.7 * arrowCoordinates[1]
            }`,
          });
        }
      });
    }

    Animated.timing(animationPercent, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(({finished}) => {
      animationPercent.removeAllListeners();
      if (finished) {
        if (arrowDegrees) {
          setTimeout(() => {
            setShowArrow(true);
            Animated.timing(animationArrow, {
              toValue: 2 + arrowDegrees / 360,
              duration: 500,
              useNativeDriver: true,
              easing: Easing.linear,
              delay: 500,
            }).start(() => {
              animationArrow.removeAllListeners();
            });
          }, 1000);
        }
      }
    });
  }, [
    animationArrow,
    animationPercent,
    slices,
    finalSlices,
    arrowDegrees,
    calcPathData,
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
        <Path ref={darkRedPathRef} fill={theme.colors.pieChartDarkRed} />
        <Path ref={redPathRef} fill={theme.colors.pieChartRed} />
        <Path ref={greenPathRef} fill={theme.colors.pieChartGreen} />
        <Path ref={lightGreenPathRef} fill={theme.colors.pieChartLightGreen} />
        {showArrow ? (
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
