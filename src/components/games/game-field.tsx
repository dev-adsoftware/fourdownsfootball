import React from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  Path,
  Polygon,
  Rect,
  SvgProps,
  Text,
  TextPath,
} from 'react-native-svg';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {AssignmentDto} from '../../services/dtos/resources/play.dto';
import {Alignment} from '../../services/dtos/types/alignment';

interface Properties extends InjectedThemeProps {
  ballOn?: number;
  opponentTeamName: string;
  opponentTeamPrimaryColor: string;
  myTeamName: string;
  myTeamPrimaryColor: string;
  assignments: AssignmentDto[];
  defendingView: boolean;
  suspendAnimation?: boolean;
}

const Component: React.FC<Properties> = props => {
  const {
    ballOn = 50,
    opponentTeamName,
    opponentTeamPrimaryColor,
    myTeamName,
    myTeamPrimaryColor,
    assignments,
    defendingView,
    suspendAnimation = false,
    theme,
  } = props;

  const [viewBoxYardLine, setViewBoxYardLine] = React.useState(25);
  const [formationOpacity, setFormationOpacity] = React.useState(0);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      aspectRatio: 0.25,
      zIndex: 0,
    },
  });

  const animationPercent = React.useRef(new Animated.Value(0)).current;
  const animationOpacity = React.useRef(new Animated.Value(0)).current;
  const svgRef = React.useRef<React.Component<SvgProps, any, any> | null>(null);

  // 0 is the minimum, 170 is the maximum ... if ball is on 0 yard line, we need to show 25 yards of field ...
  const calculateViewBoxYPos = (yardLine: number) =>
    Math.min(170, Math.max(0, 2 * (yardLine - 12 + (defendingView ? 9 : 0))));

  React.useEffect(() => {
    if (viewBoxYardLine !== ballOn && !suspendAnimation) {
      if (!animationPercent.hasListeners()) {
        animationPercent.setValue(0);
        animationPercent.addListener(animatedValue => {
          const newYardLine =
            viewBoxYardLine - animatedValue.value * (viewBoxYardLine - ballOn);
          setViewBoxYardLine(newYardLine);
        });
        animationOpacity.addListener(animatedValue => {
          setFormationOpacity(animatedValue.value);
        });
        Animated.sequence([
          Animated.timing(animationOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(animationPercent, {
            toValue: 1,
            duration: Math.abs(viewBoxYardLine - ballOn) * 10,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(animationOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]).start(() => {
          animationPercent.removeAllListeners();
          animationOpacity.removeAllListeners();
        });
      }
    }
  }, [
    animationPercent,
    animationOpacity,
    viewBoxYardLine,
    ballOn,
    suspendAnimation,
  ]);

  const renderHashMark = (yardLine: number) => {
    const yPos = String(20 + 2 * yardLine);
    return (
      <G key={`hashmark-${yardLine}`}>
        <Line
          x1="0"
          x2="2"
          y1={yPos}
          y2={yPos}
          stroke="white"
          strokeWidth="0.5"
        />
        <Line
          x1="36"
          x2="38"
          y1={yPos}
          y2={yPos}
          stroke="white"
          strokeWidth="0.5"
        />
        <Line
          x1="62"
          x2="64"
          y1={yPos}
          y2={yPos}
          stroke="white"
          strokeWidth="0.5"
        />
        <Line
          x1="98"
          x2="100"
          y1={yPos}
          y2={yPos}
          stroke="white"
          strokeWidth="0.5"
        />
      </G>
    );
  };

  const renderYardLine = (yardLine: number, color = 'white') => {
    const yPos = String(20 + 2 * yardLine);
    return (
      <Line
        key={`yardline-${yardLine}`}
        x1="0.5"
        x2="99.5"
        y1={yPos}
        y2={yPos}
        stroke={color}
        strokeWidth="0.5"
      />
    );
  };

  const renderYardMarkerText = (marker: string, pathRef: string) => {
    return (
      <Text
        key={`yardmarkertext-${pathRef}`}
        stroke="white"
        fill="white"
        strokeWidth="0.1"
        fontSize="6"
        textAnchor="start">
        <TextPath href={`#${pathRef}`}>{marker}</TextPath>
      </Text>
    );
  };

  const renderYardMarkerArrow = (
    yardLine: number,
    direction: 'up' | 'down',
  ) => {
    if (direction === 'up') {
      return (
        <>
          <Polygon
            points={`11,${20 + 2 * yardLine - 4.8} 13,${
              20 + 2 * yardLine - 4.8
            } 12,${20 + 2 * yardLine - 6.8}`}
            fill="white"
          />
          <Polygon
            points={`89,${20 + 2 * yardLine - 4.8} 87,${
              20 + 2 * yardLine - 4.8
            } 88,${20 + 2 * yardLine - 6.8}`}
            fill="white"
          />
        </>
      );
    }

    return (
      <>
        <Polygon
          points={`11,${20 + 2 * (100 - yardLine) + 4.8} 13,${
            20 + 2 * (100 - yardLine) + 4.8
          } 12,${20 + 2 * (100 - yardLine) + 6.8}`}
          fill="white"
        />
        <Polygon
          points={`89,${20 + 2 * (100 - yardLine) + 4.8} 87,${
            20 + 2 * (100 - yardLine) + 4.8
          } 88,${20 + 2 * (100 - yardLine) + 6.8}`}
          fill="white"
        />
      </>
    );
  };

  const renderYardMarkers = () => {
    return (
      <>
        <Defs>
          <Path id="leftUpFirst10" d="M 10 36.5 L 10 40" />
          <Path id="leftUpSecond10" d="M 10 40.5 L 10 45" />
          <Path id="rightUpFirst10" d="M 90 43.5 L 90 36.5" />
          <Path id="rightUpSecond10" d="M 90 39.5 L 90 36.5" />
          <Path id="leftUpFirst20" d="M 10 55.7 L 10 60" />
          <Path id="leftUpSecond20" d="M 10 60.5 L 10 65" />
          <Path id="rightUpFirst20" d="M 90 64.2 L 90 56.5" />
          <Path id="rightUpSecond20" d="M 90 59.5 L 90 56.5" />
          <Path id="leftUpFirst30" d="M 10 75.7 L 10 80" />
          <Path id="leftUpSecond30" d="M 10 80.5 L 10 85" />
          <Path id="rightUpFirst30" d="M 90 84.2 L 90 76.5" />
          <Path id="rightUpSecond30" d="M 90 79.5 L 90 76.5" />
          <Path id="leftUpFirst40" d="M 10 95.7 L 10 100" />
          <Path id="leftUpSecond40" d="M 10 100.5 L 10 105" />
          <Path id="rightUpFirst40" d="M 90 104.2 L 90 96.5" />
          <Path id="rightUpSecond40" d="M 90 99.5 L 90 96.5" />
          <Path id="leftUpFirst50" d="M 10 115.7 L 10 120" />
          <Path id="leftUpSecond50" d="M 10 120.5 L 10 125" />
          <Path id="rightUpFirst50" d="M 90 124.2 L 90 116.5" />
          <Path id="rightUpSecond50" d="M 90 119.5 L 90 116.5" />
          <Path id="leftDownFirst40" d="M 10 135.7 L 10 140" />
          <Path id="leftDownSecond40" d="M 10 140.5 L 10 145" />
          <Path id="rightDownFirst40" d="M 90 144.2 L 90 136.5" />
          <Path id="rightDownSecond40" d="M 90 139.5 L 90 136.5" />
          <Path id="leftDownFirst30" d="M 10 155.7 L 10 160" />
          <Path id="leftDownSecond30" d="M 10 160.5 L 10 165" />
          <Path id="rightDownFirst30" d="M 90 164.2 L 90 156.5" />
          <Path id="rightDownSecond30" d="M 90 159.5 L 90 156.5" />
          <Path id="leftDownFirst20" d="M 10 175.7 L 10 180" />
          <Path id="leftDownSecond20" d="M 10 180.5 L 10 185" />
          <Path id="rightDownFirst20" d="M 90 184.2 L 90 176.5" />
          <Path id="rightDownSecond20" d="M 90 179.5 L 90 176.5" />
          <Path id="leftDownFirst10" d="M 10 196.7 L 10 200" />
          <Path id="leftDownSecond10" d="M 10 200.5 L 10 205" />
          <Path id="rightDownFirst10" d="M 90 203.2 L 90 196.5" />
          <Path id="rightDownSecond10" d="M 90 199.5 L 90 196.5" />
        </Defs>
        {renderYardMarkerArrow(10, 'up')}
        {renderYardMarkerText('1', 'leftUpFirst10')}
        {renderYardMarkerText('0', 'leftUpSecond10')}
        {renderYardMarkerText('1', 'rightUpFirst10')}
        {renderYardMarkerText('0', 'rightUpSecond10')}
        {renderYardMarkerArrow(20, 'up')}
        {renderYardMarkerText('2', 'leftUpFirst20')}
        {renderYardMarkerText('0', 'leftUpSecond20')}
        {renderYardMarkerText('2', 'rightUpFirst20')}
        {renderYardMarkerText('0', 'rightUpSecond20')}
        {renderYardMarkerArrow(30, 'up')}
        {renderYardMarkerText('3', 'leftUpFirst30')}
        {renderYardMarkerText('0', 'leftUpSecond30')}
        {renderYardMarkerText('3', 'rightUpFirst30')}
        {renderYardMarkerText('0', 'rightUpSecond30')}
        {renderYardMarkerArrow(40, 'up')}
        {renderYardMarkerText('4', 'leftUpFirst40')}
        {renderYardMarkerText('0', 'leftUpSecond40')}
        {renderYardMarkerText('4', 'rightUpFirst40')}
        {renderYardMarkerText('0', 'rightUpSecond40')}
        {renderYardMarkerText('5', 'leftUpFirst50')}
        {renderYardMarkerText('0', 'leftUpSecond50')}
        {renderYardMarkerText('5', 'rightUpFirst50')}
        {renderYardMarkerText('0', 'rightUpSecond50')}
        {renderYardMarkerArrow(40, 'down')}
        {renderYardMarkerText('4', 'leftDownFirst40')}
        {renderYardMarkerText('0', 'leftDownSecond40')}
        {renderYardMarkerText('4', 'rightDownFirst40')}
        {renderYardMarkerText('0', 'rightDownSecond40')}
        {renderYardMarkerArrow(30, 'down')}
        {renderYardMarkerText('3', 'leftDownFirst30')}
        {renderYardMarkerText('0', 'leftDownSecond30')}
        {renderYardMarkerText('3', 'rightDownFirst30')}
        {renderYardMarkerText('0', 'rightDownSecond30')}
        {renderYardMarkerArrow(20, 'down')}
        {renderYardMarkerText('2', 'leftDownFirst20')}
        {renderYardMarkerText('0', 'leftDownSecond20')}
        {renderYardMarkerText('2', 'rightDownFirst20')}
        {renderYardMarkerText('0', 'rightDownSecond20')}
        {renderYardMarkerArrow(10, 'down')}
        {renderYardMarkerText('1', 'leftDownFirst10')}
        {renderYardMarkerText('0', 'leftDownSecond10')}
        {renderYardMarkerText('1', 'rightDownFirst10')}
        {renderYardMarkerText('0', 'rightDownSecond10')}
      </>
    );
  };

  const renderOffensePlayer = (alignment: Alignment, yardLine: number) => {
    let xPos = 50;
    let yPos = yardLine * 2 + 20;

    if (alignment === Alignment.Center) {
      xPos = 50;
    } else if (alignment === Alignment.LeftGuard) {
      xPos -= 5 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.LeftTackle) {
      xPos -= 10 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.YReceiver && false) {
      xPos -= 15 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.XReceiver && false) {
      xPos -= 35 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.ZReceiver && false) {
      xPos += 35 * (defendingView ? -1 : 1);
      yPos += 3 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.ZReceiver) {
      xPos -= 35 * (defendingView ? -1 : 1);
      yPos += 3 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.AReceiver) {
      xPos -= 30 * (defendingView ? -1 : 1);
      yPos += 3 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.BReceiver && false) {
      xPos += 25 * (defendingView ? -1 : 1);
      yPos += 3 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.BReceiver) {
      xPos -= 25 * (defendingView ? -1 : 1);
      yPos += 3 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.RightGuard) {
      xPos += 5 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.RightTackle) {
      xPos += 10 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.YReceiver) {
      xPos += 15 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.XReceiver) {
      xPos += 35 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.CReceiver) {
      xPos += 30 * (defendingView ? -1 : 1);
      yPos += 3 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.QBUnderCenter) {
      xPos = 50;
      yPos += 5 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.HalfBack) {
      xPos = 50;
      yPos += 17 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.OffenseCaptain) {
      xPos -= 3 * (defendingView ? -1 : 1);
      yPos += 3 * (defendingView ? -1 : 1);
    } else if (alignment === Alignment.DefenseCaptain) {
      xPos += 3 * (defendingView ? -1 : 1);
      yPos += 3 * (defendingView ? -1 : 1);
    }

    return (
      <G key={alignment}>
        <Circle
          stroke="transparent"
          fill="rgba(0,0,0,0.9)"
          x={`${xPos}.2`}
          y={`${yPos}.2`}
          r={2.2}
          strokeWidth="0.5"
        />
        <Circle
          stroke="transparent"
          fill={theme.colors.white}
          x={`${xPos}`}
          y={`${yPos}`}
          r={2}
          strokeWidth="0.5"
        />
      </G>
    );
  };

  const renderDefensePlayer = (alignment: Alignment, yardLine: number) => {
    let xPos = 50;
    let yPos = yardLine * 2 + 20;

    if (alignment === Alignment.MiddleLinebacker) {
      xPos = 50;
    } else if (alignment === Alignment.OffenseCaptain) {
      xPos -= 3 * (!defendingView ? -1 : 1);
      yPos += 3 * (!defendingView ? -1 : 1);
    } else if (alignment === Alignment.DefenseCaptain) {
      xPos += 3 * (!defendingView ? -1 : 1);
      yPos += 3 * (!defendingView ? -1 : 1);
    }

    return (
      <G key={alignment}>
        <Line
          key={`shadow-${alignment}-x1`}
          stroke="rgba(0, 0, 0, 0.9)"
          x1={`${xPos - 1.6}`}
          y1={`${yPos - 1.6}`}
          x2={`${xPos + 2}`}
          y2={`${yPos + 2}`}
          strokeWidth="0.5"
        />
        <Line
          key={`shadow-${alignment}-x2`}
          stroke="rgba(0, 0, 0, 0.9)"
          x1={`${xPos + 2}`}
          y1={`${yPos - 1.6}`}
          x2={`${xPos - 1.6}`}
          y2={`${yPos + 2}`}
          strokeWidth="0.5"
        />
        <Line
          key={`${alignment}-x1`}
          stroke={theme.colors.white}
          x1={`${xPos - 1.8}`}
          y1={`${yPos - 1.8}`}
          x2={`${xPos + 1.8}`}
          y2={`${yPos + 1.8}`}
          strokeWidth="0.5"
        />
        <Line
          key={`${alignment}-x2`}
          stroke={theme.colors.white}
          x1={`${xPos + 1.8}`}
          y1={`${yPos - 1.8}`}
          x2={`${xPos - 1.8}`}
          y2={`${yPos + 1.8}`}
          strokeWidth="0.5"
        />
      </G>
    );
  };

  return (
    <View style={[styles.container]}>
      <Svg ref={svgRef} height="100%" width="100%" viewBox={'0 0 100 400'}>
        <G transform={`translate(0,-${calculateViewBoxYPos(viewBoxYardLine)})`}>
          <Rect
            x="0"
            y="0"
            width="100%"
            height="240"
            stroke={'white'}
            strokeWidth="1"
          />
          <Rect
            x="0"
            y="0"
            width="100%"
            height="20"
            stroke={'white'}
            strokeWidth="1"
            fill={
              (
                theme.colors as {
                  [x: string]: string;
                }
              )[opponentTeamPrimaryColor.toLowerCase()]
            }
          />
          <Text
            fill="white"
            stroke="white"
            fontSize="12"
            x="50"
            y="14"
            textAnchor="middle">
            {opponentTeamName.toUpperCase()}
          </Text>
          <Rect
            x="0"
            y="220"
            width="100%"
            height="20"
            stroke={'white'}
            strokeWidth="1"
            fill={
              (
                theme.colors as {
                  [x: string]: string;
                }
              )[myTeamPrimaryColor.toLowerCase()]
            }
          />
          <Defs>
            <Path id="myTeamEndzone" d="M 100 226 L 0 226" />
          </Defs>
          <Text fill="white" stroke="white" fontSize="12" textAnchor="middle">
            <TextPath href={'#myTeamEndzone'} startOffset="50%">
              {myTeamName.toUpperCase()}
            </TextPath>
          </Text>
          {[...Array(20)].map((value: any, index: number) => {
            return renderYardLine(index * 5);
          })}
          {[...Array(100)].map((value: any, index: number) => {
            return renderHashMark(index);
          })}
          {renderYardLine(viewBoxYardLine, theme.colors.blue)}
          {renderYardLine(40, theme.colors.yellow)}
          {renderYardMarkers()}

          <G opacity={`${formationOpacity}`}>
            {assignments.map((assignment: AssignmentDto) => {
              return renderOffensePlayer(assignment.alignment, viewBoxYardLine);
            })}
            {renderDefensePlayer(Alignment.OffenseCaptain, viewBoxYardLine)}
            {renderDefensePlayer(Alignment.DefenseCaptain, viewBoxYardLine)}
            {/* <Defs>
              <Marker
                id="Triangle"
                viewBox="0 0 10 10"
                refX="0"
                refY="5"
                markerUnits={'strokeWidth' as MarkerUnits}
                markerWidth="10"
                orient="auto">
                <Path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
              </Marker>
            </Defs>
            <Path
              stroke="purple"
              markerEnd="url(#Triangle)"
              fill="none"
              d="M 52.5 137 L 85 137 L 85 135"
            />
            <Path
              stroke="orange"
              markerEnd="url(#Triangle)"
              fill="none"
              d="M 85 121 L 85 110 L 75 90"
            />
            <Path
              stroke="red"
              markerEnd="url(#Triangle)"
              fill="none"
              d="M 65 117.5 L 65 110 L 80 110"
            /> */}
          </G>
        </G>
      </Svg>
    </View>
  );
};

export const GameField = withTheme(Component);
