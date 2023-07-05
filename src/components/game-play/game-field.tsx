import React from 'react';
import {Animated, Easing, useWindowDimensions} from 'react-native';
import {
  Svg,
  SvgCircleProps,
  SvgElementType,
  SvgLineProps,
  SvgPolygonProps,
  SvgRectProps,
  SvgTextProps,
  svgTriangleMarker,
} from '../../primitives/svg';
import {View} from '../../primitives/view';
import {AssignmentDto} from '../../services/dtos/resources/play.dto';
import {Alignment} from '../../services/dtos/types/alignment';
import {Assignment} from '../../services/dtos/types/assignment';
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
  {alignment: Alignment.HuddlePlayCaller, assignment: Assignment.None},
  {alignment: Alignment.HuddleFront1, assignment: Assignment.None},
  {alignment: Alignment.HuddleFront2, assignment: Assignment.None},
  {alignment: Alignment.HuddleFront3, assignment: Assignment.None},
  {alignment: Alignment.HuddleFront4, assignment: Assignment.None},
  {alignment: Alignment.HuddleFront5, assignment: Assignment.None},
  {alignment: Alignment.HuddleBack1, assignment: Assignment.None},
  {alignment: Alignment.HuddleBack2, assignment: Assignment.None},
  {alignment: Alignment.HuddleBack3, assignment: Assignment.None},
  {alignment: Alignment.HuddleBack4, assignment: Assignment.None},
  {alignment: Alignment.HuddleBack5, assignment: Assignment.None},
];

const renderHashMark = (
  yardLine: number,
  location: 'left' | 'left-center' | 'right-center' | 'right',
): SvgElementType => {
  const yPos = String(20 + 2 * yardLine);
  if (location === 'left') {
    return {
      type: 'line',
      id: `hashmark-${location}-${yardLine}`,
      x1: 0,
      x2: 2,
      y1: yPos,
      y2: yPos,
      stroke: 'chalk',
      strokeWidth: 0.5,
    };
  }
  if (location === 'left-center') {
    return {
      type: 'line',
      id: `hashmark-${location}-${yardLine}`,
      x1: 36,
      x2: 38,
      y1: yPos,
      y2: yPos,
      stroke: 'chalk',
      strokeWidth: 0.5,
    };
  }
  if (location === 'right-center') {
    return {
      type: 'line',
      id: `hashmark-${location}-${yardLine}`,
      x1: 62,
      x2: 64,
      y1: yPos,
      y2: yPos,
      stroke: 'chalk',
      strokeWidth: 0.5,
    };
  }

  return {
    type: 'line',
    id: `hashmark-${location}-${yardLine}`,
    x1: 98,
    x2: 100,
    y1: yPos,
    y2: yPos,
    stroke: 'chalk',
    strokeWidth: 0.5,
  };
};

const renderYardLine = (
  yardLine: number,
  color: SvgLineProps['stroke'],
): SvgLineProps => {
  const yPos = String(20 + 2 * yardLine);
  return {
    type: 'line',
    id: `yardline-${yardLine}-${color}`,
    x1: 0.5,
    x2: 99.5,
    y1: yPos,
    y2: yPos,
    stroke: color,
    strokeWidth: 0.5,
  };
};

const renderYardMarkerArrow = (
  yardLine: number,
  arrowDirection: 'up' | 'down',
): SvgPolygonProps[] => {
  if (arrowDirection === 'up') {
    return [
      {
        type: 'polygon',
        id: `yardmarker-arrow-left-${yardLine}-${arrowDirection}`,
        points: `11,${20 + 2 * yardLine - 4.8} 13,${
          20 + 2 * yardLine - 4.8
        } 12,${20 + 2 * yardLine - 6.8}`,
        fill: 'chalk',
      },
      {
        type: 'polygon',
        id: `yardmarker-arrow-right-${yardLine}-${arrowDirection}`,
        points: `89,${20 + 2 * yardLine - 4.8} 87,${
          20 + 2 * yardLine - 4.8
        } 88,${20 + 2 * yardLine - 6.8}`,
        fill: 'chalk',
      },
    ];
  }

  return [
    {
      type: 'polygon',
      id: `yardmarker-arrow-left-${yardLine}-${arrowDirection}`,
      points: `11,${20 + 2 * (100 - yardLine) + 4.8} 13,${
        20 + 2 * (100 - yardLine) + 4.8
      } 12,${20 + 2 * (100 - yardLine) + 6.8}`,
      fill: 'chalk',
    },
    {
      type: 'polygon',
      id: `yardmarker-arrow-right-${yardLine}-${arrowDirection}`,
      points: `89,${20 + 2 * (100 - yardLine) + 4.8} 87,${
        20 + 2 * (100 - yardLine) + 4.8
      } 88,${20 + 2 * (100 - yardLine) + 6.8}`,
      fill: 'chalk',
    },
  ];
};

const renderYardMarkerText = (
  text: string,
  id: string,
  path: string,
): SvgTextProps => {
  return {
    id: `yardmarkertext-${id}`,
    type: 'text',
    stroke: 'chalk',
    fill: 'chalk',
    strokeWidth: 0.1,
    fontSize: 6,
    textAnchor: 'start',
    path: {d: path},
    text: text,
  };
};

const renderYardMarkers = (): SvgElementType[] => {
  return [
    renderYardMarkerText('1', 'leftUpFirst10', 'M 10 36.5 L 10 40'),
    renderYardMarkerText('0', 'leftUpSecond10', 'M 10 40.5 L 10 45'),
    renderYardMarkerText('2', 'leftUpFirst20', 'M 10 55.7 L 10 60'),
    renderYardMarkerText('0', 'leftUpSecond20', 'M 10 60.5 L 10 65'),
    renderYardMarkerText('3', 'leftUpFirst30', 'M 10 75.7 L 10 80'),
    renderYardMarkerText('0', 'leftUpSecond30', 'M 10 80.5 L 10 85'),
    renderYardMarkerText('4', 'leftUpFirst40', 'M 10 95.7 L 10 100'),
    renderYardMarkerText('0', 'leftUpSecond40', 'M 10 100.5 L 10 105'),
    renderYardMarkerText('5', 'leftUpFirst50', 'M 10 115.7 L 10 120'),
    renderYardMarkerText('0', 'leftUpSecond50', 'M 10 120.5 L 10 125'),
    renderYardMarkerText('4', 'leftDownFirst40', 'M 10 135.7 L 10 140'),
    renderYardMarkerText('0', 'leftDownSecond40', 'M 10 140.5 L 10 145'),
    renderYardMarkerText('3', 'leftDownFirst30', 'M 10 155.7 L 10 160'),
    renderYardMarkerText('0', 'leftDownSecond30', 'M 10 160.5 L 10 165'),
    renderYardMarkerText('2', 'leftDownFirst20', 'M 10 175.7 L 10 180'),
    renderYardMarkerText('0', 'leftDownSecond20', 'M 10 180.5 L 10 185'),
    renderYardMarkerText('1', 'leftDownFirst10', 'M 10 196.7 L 10 200'),
    renderYardMarkerText('0', 'leftDownSecond10', 'M 10 200.5 L 10 205'),
    renderYardMarkerText('1', 'rightUpFirst10', 'M 90 43.5 L 90 36.5'),
    renderYardMarkerText('0', 'rightUpSecond10', 'M 90 39.5 L 90 36.5'),
    renderYardMarkerText('2', 'rightUpFirst20', 'M 90 64.2 L 90 56.5'),
    renderYardMarkerText('0', 'rightUpSecond20', 'M 90 59.5 L 90 56.5'),
    renderYardMarkerText('3', 'rightUpFirst30', 'M 90 84.2 L 90 76.5'),
    renderYardMarkerText('0', 'rightUpSecond30', 'M 90 79.5 L 90 76.5'),
    renderYardMarkerText('4', 'rightUpFirst40', 'M 90 104.2 L 90 96.5'),
    renderYardMarkerText('0', 'rightUpSecond40', 'M 90 99.5 L 90 96.5'),
    renderYardMarkerText('5', 'rightUpFirst50', 'M 90 124.2 L 90 116.5'),
    renderYardMarkerText('0', 'rightUpSecond50', 'M 90 119.5 L 90 116.5'),
    renderYardMarkerText('4', 'rightDownFirst40', 'M 90 144.2 L 90 136.5'),
    renderYardMarkerText('0', 'rightDownSecond40', 'M 90 139.5 L 90 136.5'),
    renderYardMarkerText('3', 'rightDownFirst30', 'M 90 164.2 L 90 156.5'),
    renderYardMarkerText('0', 'rightDownSecond30', 'M 90 159.5 L 90 156.5'),
    renderYardMarkerText('2', 'rightDownFirst20', 'M 90 184.2 L 90 176.5'),
    renderYardMarkerText('0', 'rightDownSecond20', 'M 90 179.5 L 90 176.5'),
    renderYardMarkerText('1', 'rightDownFirst10', 'M 90 203.2 L 90 196.5'),
    renderYardMarkerText('0', 'rightDownSecond10', 'M 90 199.5 L 90 196.5'),
    ...renderYardMarkerArrow(10, 'up'),
    ...renderYardMarkerArrow(20, 'up'),
    ...renderYardMarkerArrow(30, 'up'),
    ...renderYardMarkerArrow(40, 'up'),
    ...renderYardMarkerArrow(40, 'down'),
    ...renderYardMarkerArrow(30, 'down'),
    ...renderYardMarkerArrow(20, 'down'),
    ...renderYardMarkerArrow(10, 'down'),
  ];
};

const renderOffensePlayer = (
  alignment: Alignment,
  assignment: Assignment,
  yardLine: number,
  defendingView: boolean,
  showAssignments: boolean,
): SvgElementType[] => {
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

  const svgs: SvgElementType[] = [];

  if (showAssignments && assignment === Assignment.KickoffStreak) {
    svgs.push(
      {
        type: 'path',
        id: `${alignment}-assignment-shadow`,
        stroke: 'transparentDark',
        markerEnd: 'url(#TriangleMarker)',
        strokeWidth: 0.75,
        d: `M ${xPos + 0.7} ${yPos - 2 + 0.9} L ${xPos + 0.7} ${
          yPos - 60 + 0.9
        }`,
      },
      {
        type: 'path',
        id: `${alignment}-assignment`,
        stroke: 'white',
        markerEnd: 'url(#TriangleMarker)',
        strokeWidth: 0.75,
        d: `M ${xPos} ${yPos - 2} L ${xPos} ${yPos - 60}`,
      },
    );
  }

  svgs.push(
    ...[
      {
        type: 'circle',
        id: `${alignment}-shadow`,
        x: `${xPos}.7`,
        y: `${yPos}.9`,
        r: 2.1,
        strokeWidth: 0.1,
        stroke: 'transparentDark',
        fill: 'transparentDark',
      } as SvgCircleProps,
      {
        type: 'circle',
        id: `${alignment}`,
        x: xPos,
        y: yPos,
        r: 2.1,
        strokeWidth: 0.1,
        stroke: 'offense',
        fill: 'offense',
      } as SvgCircleProps,
    ],
  );

  return svgs;
};

const renderDefensePlayer = (
  alignment: Alignment,
  assignment: Assignment,
  yardLine: number,
  defendingView: boolean,
  showAssignments: boolean,
): SvgElementType[] => {
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

  const svgs: SvgElementType[] = [];
  svgs.push(
    ...[
      {
        type: 'line',
        id: `${alignment}-x1-shadow`,
        x1: xPos - 1.1,
        y1: yPos - 1.1,
        x2: xPos + 2.5,
        y2: yPos + 2.5,
        strokeWidth: 1.2,
        stroke: 'transparentDark',
      } as SvgLineProps,
      {
        type: 'line',
        id: `${alignment}-x2-shadow`,
        x1: xPos + 2.5,
        y1: yPos - 1.1,
        x2: xPos - 1.1,
        y2: yPos + 2.5,
        strokeWidth: 1.2,
        stroke: 'transparentDark',
      } as SvgLineProps,
      {
        type: 'line',
        id: `${alignment}-x1`,
        x1: xPos - 1.8,
        y1: yPos - 1.8,
        x2: xPos + 1.8,
        y2: yPos + 1.8,
        strokeWidth: 1.2,
        stroke: 'defense',
      } as SvgLineProps,
      {
        type: 'line',
        id: `${alignment}-x2`,
        x1: xPos + 1.8,
        y1: yPos - 1.8,
        x2: xPos - 1.8,
        y2: yPos + 1.8,
        strokeWidth: 1.2,
        stroke: 'defense',
      } as SvgLineProps,
    ],
  );

  return svgs;
};

const calculateViewBoxYPos = (yardLine: number, defendingView: boolean) => {
  const viewBoxYPos = Math.min(
    70,
    Math.max(0, 2 * (yardLine - 22 + (defendingView ? 8 : 0))),
  );
  return viewBoxYPos;
};

const aspectRatio = 4;

export const GameField: React.FC<GameFieldProps> = props => {
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

  const svgElements: SvgElementType[] = React.useMemo(() => {
    const field: SvgRectProps = {
      id: 'field',
      type: 'rect',
      x: 0,
      y: 0,
      w: 100,
      h: 240,
      strokeWidth: 1,
      stroke: 'chalk',
      fill: 'grass',
    };
    const upperEndzone: SvgRectProps = {
      id: 'upperEndzone',
      type: 'rect',
      x: 0,
      y: 0,
      w: 100,
      h: 20,
      strokeWidth: 1,
      stroke: 'chalk',
      fill: props.defendingView
        ? props.direction === Direction.North
          ? props.homeTeamEndZoneColor.toLowerCase()
          : props.awayTeamEndZoneColor.toLowerCase()
        : props.direction === Direction.North
        ? props.awayTeamEndZoneColor.toLowerCase()
        : props.homeTeamEndZoneColor.toLowerCase(),
    };
    const upperEndzoneText: SvgTextProps = {
      id: 'upperEndzoneText',
      type: 'text',
      x: 50,
      y: 14,
      fontSize: 12,
      textAnchor: 'middle',
      text: props.defendingView
        ? props.direction === Direction.North
          ? props.homeTeamName.toUpperCase()
          : props.awayTeamName.toUpperCase()
        : props.direction === Direction.North
        ? props.awayTeamName.toUpperCase()
        : props.homeTeamName.toUpperCase(),
    };
    const lowerEndzone: SvgRectProps = {
      id: 'lowerEndzone',
      type: 'rect',
      x: 0,
      y: 220,
      w: 100,
      h: 20,
      strokeWidth: 1,
      stroke: 'chalk',
      fill: props.defendingView
        ? props.direction === Direction.North
          ? props.awayTeamEndZoneColor.toLowerCase()
          : props.homeTeamEndZoneColor.toLowerCase()
        : props.direction === Direction.North
        ? props.homeTeamEndZoneColor.toLowerCase()
        : props.awayTeamEndZoneColor.toLowerCase(),
    };
    const lowerEndzoneText: SvgTextProps = {
      id: 'lowerEndzoneText',
      type: 'text',
      fontSize: 12,
      stroke: 'chalk',
      fill: 'chalk',
      textAnchor: 'middle',
      path: {d: 'M 100 226 L 0 226', startOffset: '50%'},
      text: props.defendingView
        ? props.direction === Direction.North
          ? props.awayTeamName.toUpperCase()
          : props.homeTeamName.toUpperCase()
        : props.direction === Direction.North
        ? props.homeTeamName.toUpperCase()
        : props.awayTeamName.toUpperCase(),
    };
    return [
      field,
      upperEndzone,
      upperEndzoneText,
      lowerEndzone,
      lowerEndzoneText,
      ...[...Array(20)].map((_value: any, index: number) => {
        return renderYardLine(index * 5, 'chalk');
      }),
      ...[...Array(100)].map((_value: any, index: number) => {
        return renderHashMark(index, 'left');
      }),
      ...[...Array(100)].map((_value: any, index: number) => {
        return renderHashMark(index, 'left-center');
      }),
      ...[...Array(100)].map((_value: any, index: number) => {
        return renderHashMark(index, 'right-center');
      }),
      ...[...Array(100)].map((_value: any, index: number) => {
        return renderHashMark(index, 'right');
      }),
      renderYardLine(props.ballOn.current, 'primary'),
      ...renderYardMarkers(),
      ...(!props.defendingView && props.offenseAssignments.length > 0
        ? props.offenseAssignments
        : huddleAssignments
      )
        .map(
          (
            assignment:
              | AssignmentDto
              | {alignment: Alignment; assignment: Assignment},
          ) => {
            return renderOffensePlayer(
              assignment.alignment,
              assignment.assignment,
              props.ballOn.current,
              props.defendingView,
              !props.defendingView,
            );
          },
        )
        .flat(),
      ...(props.defendingView && props.defenseAssignments.length > 0
        ? props.defenseAssignments
        : props.defendingView
        ? huddleAssignments
        : []
      )
        .map(
          (
            assignment:
              | AssignmentDto
              | {alignment: Alignment; assignment: Assignment},
          ) => {
            return renderDefensePlayer(
              assignment.alignment,
              assignment.assignment,
              props.ballOn.current,
              props.defendingView,
              props.defendingView,
            );
          },
        )
        .flat(),
    ];
  }, [
    props.defendingView,
    props.direction,
    props.homeTeamEndZoneColor,
    props.awayTeamEndZoneColor,
    props.homeTeamName,
    props.awayTeamName,
    props.ballOn,
    props.offenseAssignments,
    props.defenseAssignments,
  ]);

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
          w={width}
          h={width * aspectRatio}
          viewBoxWidth={100}
          viewBoxHeight={100 * aspectRatio}
          defs={[svgTriangleMarker]}
          elements={svgElements}
        />
      </View>
    </View>
  );
};
