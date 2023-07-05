import {times, uniq} from 'lodash';
import React from 'react';
import {TabItemsScrollView} from '../components/scrollables/tab-items-scroll-view';
import {ScrollView} from '../primitives/scroll-view';
import {Svg, SvgElementType, svgTriangleMarker} from '../primitives/svg';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {PlaySnapshotDto} from '../services/dtos';
import {Alignment} from '../services/dtos/types/alignment';
import {Assignment} from '../services/dtos/types/assignment';
import {GameEngine} from '../utilities/game-engine';

interface PlayCallScreenProps {
  plays: PlaySnapshotDto[];
  onSelect: (play: PlaySnapshotDto) => void;
}

export const PlayCallScreen: React.FC<PlayCallScreenProps> = props => {
  const [playboxWidth, setPlayboxWidth] = React.useState<number>();

  const formations = React.useMemo(() => {
    return uniq(
      props.plays.map(play => {
        return GameEngine.getFormationName(play.formation);
      }),
    );
  }, [props.plays]);

  const calcOffensePlayerElement = React.useCallback(
    (alignment: Alignment, assignment: Assignment): SvgElementType[] => {
      let xPos = playboxWidth! / 2;
      let yPos = (playboxWidth! * 0.7) / 2;

      const gridWidth = playboxWidth! / 22;

      if (alignment === Alignment.Center) {
        xPos = 50;
      } else if (alignment === Alignment.LeftGuard) {
        xPos -= 5;
      } else if (alignment === Alignment.LeftTackle) {
        xPos -= 10;
      } else if (alignment === Alignment.RightGuard) {
        xPos += 5;
      } else if (alignment === Alignment.RightTackle) {
        xPos += 10;
      } else if (alignment === Alignment.YReceiver) {
        xPos += 15;
      } else if (alignment === Alignment.XReceiver) {
        xPos -= 35;
      } else if (alignment === Alignment.ZReceiver) {
        xPos += 35;
        yPos += 3;
      } else if (alignment === Alignment.AReceiver) {
        xPos -= 30;
        yPos += 3;
      } else if (alignment === Alignment.BReceiver) {
        xPos -= 25;
        yPos += 3;
      } else if (alignment === Alignment.CReceiver) {
        xPos += 30;
        yPos += 3;
      } else if (alignment === Alignment.QBUnderCenter) {
        xPos = 50;
        yPos += 5;
      } else if (alignment === Alignment.HalfBack) {
        xPos = 50;
        yPos += 17;
      } else if (alignment === Alignment.OffenseCaptain) {
        xPos -= 3;
        yPos += 3;
      } else if (alignment === Alignment.DefenseCaptain) {
        xPos += 3;
        yPos += 3;
      } else if (alignment === Alignment.KickoffKicker) {
        yPos += gridWidth * 4;
        xPos -= gridWidth;
      } else if (alignment === Alignment.KickoffStreaker1) {
        yPos += gridWidth * 2;
        xPos -= gridWidth * 2;
      } else if (alignment === Alignment.KickoffStreaker2) {
        yPos += gridWidth * 2;
        xPos -= gridWidth * 4;
      } else if (alignment === Alignment.KickoffStreaker3) {
        yPos += gridWidth * 2;
        xPos -= gridWidth * 6;
      } else if (alignment === Alignment.KickoffStreaker4) {
        yPos += gridWidth * 2;
        xPos -= gridWidth * 8;
      } else if (alignment === Alignment.KickoffStreaker5) {
        yPos += gridWidth * 2;
        xPos -= gridWidth * 10;
      } else if (alignment === Alignment.KickoffStreaker6) {
        yPos += gridWidth * 2;
        xPos += gridWidth * 2;
      } else if (alignment === Alignment.KickoffStreaker7) {
        yPos += gridWidth * 2;
        xPos += gridWidth * 4;
      } else if (alignment === Alignment.KickoffStreaker8) {
        yPos += gridWidth * 2;
        xPos += gridWidth * 6;
      } else if (alignment === Alignment.KickoffStreaker9) {
        yPos += gridWidth * 2;
        xPos += gridWidth * 8;
      } else if (alignment === Alignment.KickoffStreaker10) {
        yPos += gridWidth * 2;
        xPos += gridWidth * 10;
      } else if (alignment === Alignment.HuddlePlayCaller) {
        yPos += 7;
      } else if (alignment === Alignment.HuddleFront1) {
        xPos -= 10;
        yPos += 13;
      } else if (alignment === Alignment.HuddleFront2) {
        xPos -= 5;
        yPos += 13;
      } else if (alignment === Alignment.HuddleFront3) {
        yPos += 13;
      } else if (alignment === Alignment.HuddleFront4) {
        xPos += 5;
        yPos += 13;
      } else if (alignment === Alignment.HuddleFront5) {
        xPos += 10;
        yPos += 13;
      } else if (alignment === Alignment.HuddleBack1) {
        xPos -= 10;
        yPos += 18;
      } else if (alignment === Alignment.HuddleBack2) {
        xPos -= 5;
        yPos += 18;
      } else if (alignment === Alignment.HuddleBack3) {
        yPos += 18;
      } else if (alignment === Alignment.HuddleBack4) {
        xPos += 5;
        yPos += 18;
      } else if (alignment === Alignment.HuddleBack5) {
        xPos += 10;
        yPos += 18;
      }

      const svgs: SvgElementType[] = [
        {
          type: 'circle',
          id: String(alignment),
          fill: 'darkText',
          x: xPos,
          y: yPos,
          r: 3,
        },
      ];
      if (assignment === Assignment.KickoffStreak) {
        svgs.push({
          type: 'path',
          id: `${String(alignment)}Assignment`,
          stroke: 'darkText',
          markerEnd: 'url(#TriangleMarker)',
          strokeWidth: 1,
          d: `M ${xPos} ${yPos} L ${xPos} 15`,
        });
      }
      return svgs;
    },
    [playboxWidth],
  );

  return (
    <View
      bg="white"
      pt={5}
      flex={1}
      onLayout={e => {
        setPlayboxWidth(e.nativeEvent.layout.width / 2 - 8);
      }}>
      <TabItemsScrollView
        labels={formations}
        fontSize={14}
        onSelect={index => {
          console.log('selected label', index);
        }}
      />
      {playboxWidth ? (
        <ScrollView flex={1} w="full">
          {times(Math.ceil(props.plays.length / 2)).map(row => {
            return (
              <View key={row} row mt={10}>
                <View
                  onPress={() => {
                    props.onSelect(props.plays[row * 2]);
                  }}
                  flex={1}
                  mr={4}
                  borderWidth={1}
                  borderColor="darkText"
                  borderRadius={4}
                  bg="oddLayerSurface">
                  <Text
                    pl={4}
                    pb={2}
                    bg="primary"
                    text={props.plays[row * 2].name.toUpperCase()}
                    typeFace="klavikaCondensedBold"
                    fontSize={14}
                    color="white"
                  />
                  <Svg
                    w={playboxWidth}
                    h={playboxWidth * 0.7}
                    defs={[svgTriangleMarker]}
                    elements={props.plays[row * 2].assignments.reduce(
                      (prev, current) => {
                        return prev.concat(
                          ...calcOffensePlayerElement(
                            current.alignment,
                            current.assignment,
                          ),
                        );
                      },
                      [] as SvgElementType[],
                    )}
                  />
                </View>
                {row * 2 + 1 < props.plays.length ? (
                  <View
                    onPress={() => {
                      props.onSelect(props.plays[row * 2 + 1]);
                    }}
                    flex={1}
                    ml={4}
                    borderWidth={1}
                    borderColor="darkText"
                    borderRadius={4}
                    bg="oddLayerSurface">
                    <Text
                      pl={4}
                      pb={2}
                      bg="primary"
                      text={props.plays[row * 2 + 1].name.toUpperCase()}
                      typeFace="klavikaCondensedBold"
                      fontSize={14}
                      color="white"
                    />
                    <Svg
                      w={playboxWidth}
                      h={playboxWidth * 0.7}
                      defs={[svgTriangleMarker]}
                      elements={props.plays[row * 2 + 1].assignments.reduce(
                        (prev, current) => {
                          return prev.concat(
                            ...calcOffensePlayerElement(
                              current.alignment,
                              current.assignment,
                            ),
                          );
                        },
                        [] as SvgElementType[],
                      )}
                    />
                  </View>
                ) : (
                  <View
                    flex={1}
                    ml={4}
                    // borderWidth={1}
                    // borderColor="darkText"
                    // borderRadius={4}
                    // bg="oddLayerSurface"
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
};
