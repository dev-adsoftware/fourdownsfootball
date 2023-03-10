import React from 'react';
import {Animated, Easing, useWindowDimensions} from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  Path,
  Polygon,
  Rect,
  Text,
  TextPath,
} from 'react-native-svg';
import {View} from '../../primitives/view';
import {useTheme} from '../../providers/theme';
// import {View} from '../components/primitives/view';
import {AssignmentDto} from '../../services/dtos/resources/play.dto';
import {Alignment} from '../../services/dtos/types/alignment';
import {Direction} from '../../services/dtos/types/directions';

interface GameFieldProps {
  ballOn: {previous: number; current: number};
  direction: Direction;
  homeTeamName: string;
  homeTeamEndZoneColor: string;
  awayTeamName: string;
  awayTeamEndZoneColor: string;
  offenseAssignments: AssignmentDto[];
  defenseAssignments: AssignmentDto[];
  defendingView: boolean;
  animateFuncRef: React.MutableRefObject<
    ((onAnimationFinished: () => void) => void) | undefined
  >;
}

const huddleAssignments = [
  {alignment: Alignment.HuddlePlayCaller},
  {alignment: Alignment.HuddleFront1},
  {alignment: Alignment.HuddleFront2},
  {alignment: Alignment.HuddleFront3},
  {alignment: Alignment.HuddleFront4},
  {alignment: Alignment.HuddleFront5},
  {alignment: Alignment.HuddleBack1},
  {alignment: Alignment.HuddleBack2},
  {alignment: Alignment.HuddleBack3},
  {alignment: Alignment.HuddleBack4},
  {alignment: Alignment.HuddleBack5},
];

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

const renderYardLine = (yardLine: number, color: string) => {
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
  arrowDirection: 'up' | 'down',
) => {
  if (arrowDirection === 'up') {
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

const renderOffensePlayer = (
  alignment: Alignment,
  yardLine: number,
  defendingView: boolean,
) => {
  let xPos = 50;
  let yPos = yardLine * 2 + 20;

  if (alignment === Alignment.Center) {
    xPos = 50;
  } else if (alignment === Alignment.LeftGuard) {
    xPos -= 5 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.LeftTackle) {
    xPos -= 10 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.RightGuard) {
    xPos += 5 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.RightTackle) {
    xPos += 10 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.YReceiver) {
    xPos += 15 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.XReceiver) {
    xPos -= 35 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.ZReceiver) {
    xPos += 35 * (defendingView ? -1 : 1);
    yPos += 3 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.AReceiver) {
    xPos -= 30 * (defendingView ? -1 : 1);
    yPos += 3 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.BReceiver) {
    xPos -= 25 * (defendingView ? -1 : 1);
    yPos += 3 * (defendingView ? -1 : 1);
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
  } else if (alignment === Alignment.KickoffKicker) {
    yPos += 20 * (defendingView ? -1 : 1);
    xPos -= 5 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker1) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos -= 10 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker2) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos -= 17 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker3) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos -= 24 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker4) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos -= 31 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker5) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos -= 38 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker6) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos += 10 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker7) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos += 17 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker8) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos += 24 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker9) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos += 31 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffStreaker10) {
    yPos += 10 * (defendingView ? -1 : 1);
    xPos += 38 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddlePlayCaller) {
    yPos += 7 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront1) {
    xPos -= 10 * (defendingView ? -1 : 1);
    yPos += 13 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront2) {
    xPos -= 5 * (defendingView ? -1 : 1);
    yPos += 13 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront3) {
    yPos += 13 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront4) {
    xPos += 5 * (defendingView ? -1 : 1);
    yPos += 13 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront5) {
    xPos += 10 * (defendingView ? -1 : 1);
    yPos += 13 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack1) {
    xPos -= 10 * (defendingView ? -1 : 1);
    yPos += 18 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack2) {
    xPos -= 5 * (defendingView ? -1 : 1);
    yPos += 18 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack3) {
    yPos += 18 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack4) {
    xPos += 5 * (defendingView ? -1 : 1);
    yPos += 18 * (defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack5) {
    xPos += 10 * (defendingView ? -1 : 1);
    yPos += 18 * (defendingView ? -1 : 1);
  }

  return (
    <G key={alignment}>
      <Circle
        stroke="rgba(0,0,0,0.7)"
        fill="rgba(0,0,0,0.7)"
        x={`${xPos}.5`}
        y={`${yPos}.5`}
        r={2.1}
        strokeWidth="0.1"
      />
      <Circle
        stroke={defendingView ? 'white' : '#2E67F8' || 'blue'}
        fill={defendingView ? 'white' : '#2E67F8' || 'blue'}
        x={`${xPos}`}
        y={`${yPos}`}
        r={2.1}
        strokeWidth="0.1"
      />
    </G>
  );
};

const renderDefensePlayer = (
  alignment: Alignment,
  yardLine: number,
  defendingView: boolean,
) => {
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
  } else if (alignment === Alignment.HuddlePlayCaller) {
    yPos += 7 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront1) {
    xPos -= 10 * (!defendingView ? -1 : 1);
    yPos += 13 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront2) {
    xPos -= 5 * (!defendingView ? -1 : 1);
    yPos += 13 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront3) {
    yPos += 13 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront4) {
    xPos += 5 * (!defendingView ? -1 : 1);
    yPos += 13 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleFront5) {
    xPos += 10 * (!defendingView ? -1 : 1);
    yPos += 13 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack1) {
    xPos -= 10 * (!defendingView ? -1 : 1);
    yPos += 18 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack2) {
    xPos -= 5 * (!defendingView ? -1 : 1);
    yPos += 18 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack3) {
    yPos += 18 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack4) {
    xPos += 5 * (!defendingView ? -1 : 1);
    yPos += 18 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.HuddleBack5) {
    xPos += 10 * (!defendingView ? -1 : 1);
    yPos += 18 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffReturner) {
    yPos += 100 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker1) {
    yPos += 10 * (!defendingView ? -1 : 1);
    xPos -= 30 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker2) {
    yPos += 10 * (!defendingView ? -1 : 1);
    xPos -= 15 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker3) {
    yPos += 10 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker4) {
    yPos += 10 * (!defendingView ? -1 : 1);
    xPos += 15 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker5) {
    yPos += 10 * (!defendingView ? -1 : 1);
    xPos += 30 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker6) {
    yPos += 40 * (!defendingView ? -1 : 1);
    xPos -= 25 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker7) {
    yPos += 40 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker8) {
    yPos += 40 * (!defendingView ? -1 : 1);
    xPos += 25 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker9) {
    yPos += 70 * (!defendingView ? -1 : 1);
    xPos -= 20 * (!defendingView ? -1 : 1);
  } else if (alignment === Alignment.KickoffBlocker10) {
    yPos += 70 * (!defendingView ? -1 : 1);
    xPos += 20 * (!defendingView ? -1 : 1);
  }

  return (
    <G key={alignment}>
      <Line
        key={`shadow-${alignment}-x1`}
        stroke="rgba(0, 0, 0, 0.9)"
        x1={`${xPos - 1.3}`}
        y1={`${yPos - 1.3}`}
        x2={`${xPos + 2.3}`}
        y2={`${yPos + 2.3}`}
        strokeWidth="1.2"
      />
      <Line
        key={`shadow-${alignment}-x2`}
        stroke="rgba(0, 0, 0, 0.9)"
        x1={`${xPos + 2.3}`}
        y1={`${yPos - 1.3}`}
        x2={`${xPos - 1.3}`}
        y2={`${yPos + 2.3}`}
        strokeWidth="1.2"
      />
      <Line
        key={`${alignment}-x1`}
        stroke={defendingView ? '#2E67F8' || 'blue' : 'white'}
        x1={`${xPos - 1.8}`}
        y1={`${yPos - 1.8}`}
        x2={`${xPos + 1.8}`}
        y2={`${yPos + 1.8}`}
        strokeWidth="1.2"
      />
      <Line
        key={`${alignment}-x2`}
        stroke={defendingView ? '#2E67F8' || 'blue' : 'white'}
        x1={`${xPos + 1.8}`}
        y1={`${yPos - 1.8}`}
        x2={`${xPos - 1.8}`}
        y2={`${yPos + 1.8}`}
        strokeWidth="1.2"
      />
    </G>
  );
};

const calculateViewBoxYPos = (yardLine: number, defendingView: boolean) => {
  const viewBoxYPos = Math.min(
    170,
    Math.max(0, 2 * (yardLine - 22 + (defendingView ? 18 : 0))),
  );
  return viewBoxYPos;
};

const grassColor = '#71A92C';
// const chalkColor = 'rgba(255,255,255,0.5)';

const aspectRatio = 4;

export const GameField: React.FC<GameFieldProps> = props => {
  const svgRef = React.useRef<Svg | null>(null);

  const theme = useTheme();
  const {width} = useWindowDimensions();

  const {current: animationPercent} = React.useRef(new Animated.Value(0));

  const animateViewBox = React.useCallback(
    (onFinished: () => void) => {
      if (props.ballOn.previous !== props.ballOn.current) {
        animationPercent.setValue(0);
        Animated.timing(animationPercent, {
          toValue: 1,
          duration: Math.abs(props.ballOn.previous - props.ballOn.current) * 10,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start(({finished}) => {
          if (finished) {
            onFinished();
          }
        });
      }
    },
    [animationPercent, props.ballOn],
  );

  const animate = React.useCallback(
    (onAnimationFinished: () => void) => {
      setTimeout(() => {
        animateViewBox(() => {
          onAnimationFinished();
        });
      }, 500);
    },
    [animateViewBox],
  );

  React.useEffect(() => {
    props.animateFuncRef.current = animate;
  }, [animate, props.animateFuncRef]);

  return (
    <View overflow="hidden">
      <View
        animated
        animatedTranslateY={{
          animatedValue: animationPercent,
          range: [
            -aspectRatio *
              calculateViewBoxYPos(props.ballOn.previous, props.defendingView),
            -aspectRatio *
              calculateViewBoxYPos(props.ballOn.current, props.defendingView),
          ],
        }}>
        <Svg
          ref={svgRef}
          width={width}
          height={width * aspectRatio}
          viewBox={'0 0 100 400'}>
          <G>
            <Rect
              x="0"
              y="0"
              width="100"
              height="240"
              stroke={'white'}
              strokeWidth="1"
              fill={grassColor}
            />
            <Rect
              x="0"
              y="0"
              width="100"
              height="20"
              stroke={'white'}
              strokeWidth="1"
              fill={
                theme.teamColors[
                  props.defendingView
                    ? props.direction === Direction.North
                      ? props.homeTeamEndZoneColor.toLowerCase()
                      : props.awayTeamEndZoneColor.toLowerCase()
                    : props.direction === Direction.North
                    ? props.awayTeamEndZoneColor.toLowerCase()
                    : props.homeTeamEndZoneColor.toLowerCase()
                ]
              }
            />
            <Text
              fill={'white'}
              stroke={'white'}
              fontSize="12"
              x="50"
              y="14"
              textAnchor="middle">
              {props.defendingView
                ? props.direction === Direction.North
                  ? props.homeTeamName.toUpperCase()
                  : props.awayTeamName.toUpperCase()
                : props.direction === Direction.North
                ? props.awayTeamName.toUpperCase()
                : props.homeTeamName.toUpperCase()}
            </Text>
            <Rect
              x="0"
              y="220"
              width="100"
              height="20"
              stroke={'white'}
              strokeWidth="1"
              fill={
                theme.teamColors[
                  props.defendingView
                    ? props.direction === Direction.North
                      ? props.awayTeamEndZoneColor.toLowerCase()
                      : props.homeTeamEndZoneColor.toLowerCase()
                    : props.direction === Direction.North
                    ? props.homeTeamEndZoneColor.toLowerCase()
                    : props.awayTeamEndZoneColor.toLowerCase()
                ]
              }
            />
            <Defs>
              <Path id="homeTeamEndzone" d="M 100 226 L 0 226" />
            </Defs>
            <Text
              fill={'white'}
              stroke={'white'}
              fontSize="12"
              textAnchor="middle">
              <TextPath href={'#homeTeamEndzone'} startOffset="50%">
                {props.defendingView
                  ? props.direction === Direction.North
                    ? props.awayTeamName.toUpperCase()
                    : props.homeTeamName.toUpperCase()
                  : props.direction === Direction.North
                  ? props.homeTeamName.toUpperCase()
                  : props.awayTeamName.toUpperCase()}
              </TextPath>
            </Text>
            {[...Array(20)].map((value: any, index: number) => {
              return renderYardLine(index * 5, 'white');
            })}
            {[...Array(100)].map((value: any, index: number) => {
              return renderHashMark(index);
            })}
            {renderYardLine(props.ballOn.current, 'blue')}
            {/* {renderYardLine(40, theme.colors.yellow)} */}
            {renderYardMarkers()}

            <G>
              {(props.offenseAssignments.length > 0
                ? props.offenseAssignments
                : huddleAssignments
              ).map((assignment: AssignmentDto | {alignment: Alignment}) => {
                return renderOffensePlayer(
                  assignment.alignment,
                  props.ballOn.current,
                  props.defendingView,
                );
              })}
              {(props.defenseAssignments.length > 0
                ? props.defenseAssignments
                : huddleAssignments
              ).map((assignment: AssignmentDto | {alignment: Alignment}) => {
                return renderDefensePlayer(
                  assignment.alignment,
                  props.ballOn.current,
                  props.defendingView,
                );
              })}
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
    </View>
  );
};
