import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, Line, Polygon, Rect} from 'react-native-svg';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {AnimatedPath} from '../svg/animated-path';

interface Play {
  gainLoss: number;
  playType: 'run' | 'pass' | 'punt' | 'fg' | 'kickoff';
}

interface Properties extends InjectedThemeProps {
  awayTeamAbbr: string;
  awayTeamColor: string;
  homeTeamAbbr: string;
  homeTeamColor: string;
  ballOn: number;
  distance: number;
  driveStartYardLine: number;
  lastPlay: Play;
  //   activeGame: DataItemSegment<Game>;
}

const Component: React.FC<Properties> = props => {
  const {
    awayTeamAbbr,
    awayTeamColor,
    homeTeamAbbr,
    homeTeamColor,
    ballOn,
    distance,
    driveStartYardLine,
    lastPlay,
    theme,
  } = props;

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 100,
      backgroundColor: theme.colors.secondaryBackground,
      padding: 10,
    },
    yardMarkerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    yardMarkerText: {
      ...theme.typography.caption2,
      color: theme.colors.text,
      marginTop: -10,
    },
    yardMarker20Text: {
      ...theme.typography.caption2,
      color: theme.colors.text,
      marginTop: -10,
      paddingRight: 13,
    },
    yardMarker80Text: {
      ...theme.typography.caption2,
      color: theme.colors.text,
      marginTop: -10,
      paddingLeft: 13,
    },
  });

  const renderYardLine = (yardLine: number, color: string) => {
    let xSkewPos = 0;
    if (yardLine >= 0 && yardLine <= 20) {
      xSkewPos = 32 + Math.round(((yardLine - 0) * 17) / 10);
    } else if (yardLine >= 21 && yardLine <= 80) {
      xSkewPos = 66 + Math.round(((yardLine - 20) * 18) / 10);
    } else if (yardLine >= 81 && yardLine <= 100) {
      xSkewPos = 174 + Math.round(((yardLine - 80) * 17) / 10);
    }

    const xPos = yardLine * 2 + 20;

    return (
      <Line
        x1={String(xSkewPos)}
        y1="0"
        x2={String(xPos)}
        y2="30"
        stroke={color}
        strokeWidth="1"
      />
    );
  };

  const calcBallXPosition = (yardLine: number) => {
    let xPos = 0;

    if (yardLine >= -10 && yardLine <= 20) {
      xPos =
        Math.round((15 + 0) / 2) +
        Math.round(((yardLine - -10) * ((17 + 20) / 2)) / 10) -
        1;
    } else if (yardLine >= 21 && yardLine <= 80) {
      xPos =
        Math.round((66 + 60) / 2) +
        Math.round(((yardLine - 20) * ((18 + 20) / 2)) / 10);
    } else if (yardLine >= 81 && yardLine <= 110) {
      xPos =
        Math.round((174 + 180) / 2) +
        Math.round(((yardLine - 80) * ((17 + 20) / 2)) / 10);
    }

    return xPos;
  };

  const renderBallPosition = (yardLine: number, color: string) => {
    return (
      <Circle
        cx={String(calcBallXPosition(yardLine))}
        cy="15"
        r="3"
        fill={color}
        stroke={theme.colors.white}
      />
    );
  };

  const renderRunGain = (
    startYardLine: number,
    endYardLine: number,
    color: string,
  ) => {
    return (
      <Line
        x1={String(calcBallXPosition(startYardLine))}
        y1="15"
        x2={String(calcBallXPosition(endYardLine))}
        y2="15"
        stroke={color}
        strokeWidth="2"
      />
    );
  };

  const convertLastPlayToPath = (
    startYardLine: number,
    endYardLine: number,
    lineArc: 'line' | 'arc' = 'line',
  ): string => {
    // M25,25 H40
    const startXPosition = calcBallXPosition(startYardLine);
    const endXPosition = calcBallXPosition(endYardLine);
    if (lineArc === 'line') {
      return `M${startXPosition},15 H${endXPosition}`;
    }

    return `M${startXPosition},15 H${endXPosition}`;
  };

  return (
    <View style={[styles.container]}>
      <Svg height="100%" width="100%" viewBox="0 0 240 35">
        <Polygon
          points="15,0 32,0 20,30, 0,30"
          fill={awayTeamColor}
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="32,0 49,0 40,30, 20,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="49,0 66,0 60,30, 40,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="66,0 84,0 80,30, 60,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="84,0 102,0 100,30, 80,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="102,0 120,0 120,30, 100,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="120,0 138,0 140,30, 120,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="138,0 156,0 160,30, 140,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="156,0 174,0 180,30, 160,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="174,0 191,0 200,30, 180,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="191,0 208,0 220,30, 200,30"
          fill="#00AA00"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Polygon
          points="208,0 225,0 240,30, 220,30"
          fill={homeTeamColor}
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        <Rect
          x="0"
          y="30"
          width="240"
          height="3"
          fill="#005500"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
        {renderYardLine(ballOn, theme.colors.blue)}
        {renderYardLine(ballOn + distance, theme.colors.yellow)}
        {renderBallPosition(driveStartYardLine, theme.colors.white)}
        {renderRunGain(driveStartYardLine, ballOn, theme.colors.white)}
        <AnimatedPath
          path={convertLastPlayToPath(
            ballOn,
            ballOn + lastPlay.gainLoss,
            lastPlay.playType === 'run' ? 'line' : 'arc',
          )}
        />
        {renderBallPosition(ballOn, theme.colors.brown)}
        <Polygon
          points="15,0 225,0 240,30, 0,30"
          stroke={theme.colors.white}
          strokeWidth="1"
        />
      </Svg>
      <View style={[styles.yardMarkerContainer]}>
        <Text style={[styles.yardMarkerText]}>{awayTeamAbbr}</Text>
        <Text style={[styles.yardMarker20Text]}>20</Text>
        <Text style={[styles.yardMarkerText]}>50</Text>
        <Text style={[styles.yardMarker80Text]}>20</Text>
        <Text style={[styles.yardMarkerText]}>{homeTeamAbbr}</Text>
      </View>
    </View>
  );
};

export const GamePlayField = withTheme(Component);
