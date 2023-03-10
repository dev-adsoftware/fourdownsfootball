import {uniq} from 'lodash';
import React from 'react';
import {FlatList as RNFlatList, ViewToken} from 'react-native';
import {PlayCallDto, PlaySnapshotDto} from '../../services/dtos';
import {Formation} from '../../services/dtos/types/formation';
import {GameEngine} from '../../utilities/game-engine';
import {FlatList} from '../../primitives/flatlist';
import {Icon} from '../../primitives/icon';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {CircleCloseButton} from '../buttons/circle-close-button';
import {IconButton} from '../buttons/icon-button';
import {ToggleButton} from '../buttons/toggle-button';
import {HorizontalSeparator} from '../separators/horizontal-separator';
import {Alignment} from '../../services/dtos/types/alignment';
import {Svg, SvgCircleProps, svgTriangleMarker} from '../../primitives/svg';

interface PlaybookCarouselProps {
  plays: PlaySnapshotDto[];
  selectedPlayCall: PlayCallDto;
  onSelect: (playCall: PlayCallDto) => void;
  onClose: () => void;
}

enum _CarouselItemType {
  ITFormation,
  ITPlay,
}

enum _NavigationLevel {
  NavFormation,
  NavPlay,
  NavPlayDetail,
  NavTargets,
}

interface _CarouselItem {
  id: string;
  type: _CarouselItemType;
  play?: PlaySnapshotDto;
  onSelect: () => void;
}

const DIAGRAM_WIDTH = 250;
const DIAGRAM_HEIGHT = 175;

const calcOffensePlayerElement = (alignment: Alignment): SvgCircleProps => {
  let xPos = DIAGRAM_WIDTH / 2;
  let yPos = DIAGRAM_HEIGHT - 40;

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
    yPos += 30;
    xPos -= 10;
  } else if (alignment === Alignment.KickoffStreaker1) {
    yPos += 10;
    xPos -= 30;
  } else if (alignment === Alignment.KickoffStreaker2) {
    yPos += 10;
    xPos -= 50;
  } else if (alignment === Alignment.KickoffStreaker3) {
    yPos += 10;
    xPos -= 70;
  } else if (alignment === Alignment.KickoffStreaker4) {
    yPos += 10;
    xPos -= 90;
  } else if (alignment === Alignment.KickoffStreaker5) {
    yPos += 10;
    xPos -= 110;
  } else if (alignment === Alignment.KickoffStreaker6) {
    yPos += 10;
    xPos += 30;
  } else if (alignment === Alignment.KickoffStreaker7) {
    yPos += 10;
    xPos += 50;
  } else if (alignment === Alignment.KickoffStreaker8) {
    yPos += 10;
    xPos += 70;
  } else if (alignment === Alignment.KickoffStreaker9) {
    yPos += 10;
    xPos += 90;
  } else if (alignment === Alignment.KickoffStreaker10) {
    yPos += 10;
    xPos += 110;
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

  return {
    type: 'circle',
    id: String(alignment),
    fill: 'darkText',
    x: xPos,
    y: yPos,
    r: 5,
  };
};

const _RenderCarouselItem: React.FC<{item: _CarouselItem}> = props => {
  return (
    <View
      flex={1}
      w={300}
      p={20}
      bg="oddLayerSurface"
      alignItems="center"
      justifyContent="center">
      <View
        w="full"
        flex={1}
        borderWidth={1}
        borderColor="darkText"
        alignItems="center"
        justifyContent="center"
        onPress={() => {
          props.item.onSelect();
        }}>
        <View
          flex={1}
          w="full"
          alignItems="center"
          justifyContent="space-between">
          <View alignItems="center" mt={5}>
            <Svg
              w={250}
              h={175}
              defs={[svgTriangleMarker]}
              elements={[
                calcOffensePlayerElement(Alignment.KickoffStreaker1),
                calcOffensePlayerElement(Alignment.KickoffStreaker2),
                calcOffensePlayerElement(Alignment.KickoffStreaker3),
                calcOffensePlayerElement(Alignment.KickoffStreaker4),
                calcOffensePlayerElement(Alignment.KickoffStreaker5),
                calcOffensePlayerElement(Alignment.KickoffKicker),
                calcOffensePlayerElement(Alignment.KickoffStreaker6),
                calcOffensePlayerElement(Alignment.KickoffStreaker7),
                calcOffensePlayerElement(Alignment.KickoffStreaker8),
                calcOffensePlayerElement(Alignment.KickoffStreaker9),
                calcOffensePlayerElement(Alignment.KickoffStreaker10),
                {
                  type: 'path',
                  id: 'KickoffStreak1Assignment',
                  stroke: 'darkText',
                  markerEnd: 'url(#TriangleMarker)',
                  strokeWidth: 2,
                  d: 'M 95 140 L 95 40',
                },
                {
                  type: 'path',
                  id: 'KickoffStreak2Assignment',
                  stroke: 'darkText',
                  markerEnd: 'url(#TriangleMarker)',
                  strokeWidth: 2,
                  d: 'M 75 140 L 75 40',
                },
                {
                  type: 'path',
                  id: 'KickoffStreak3Assignment',
                  stroke: 'darkText',
                  markerEnd: 'url(#TriangleMarker)',
                  strokeWidth: 2,
                  d: 'M 55 140 L 55 40',
                },
                {
                  type: 'path',
                  id: 'KickoffStreak4Assignment',
                  stroke: 'darkText',
                  markerEnd: 'url(#TriangleMarker)',
                  strokeWidth: 2,
                  d: 'M 35 140 L 35 40',
                },
                {
                  type: 'path',
                  id: 'KickoffStreak5Assignment',
                  stroke: 'darkText',
                  markerEnd: 'url(#TriangleMarker)',
                  strokeWidth: 2,
                  d: 'M 15 140 L 15 40',
                },
              ]}
            />
          </View>
          <View flex={1} justifyContent="center">
            <Text
              text={
                props.item.play
                  ? props.item.play.name.toUpperCase()
                  : props.item.id.toUpperCase()
              }
              typeFace="klavikaCondensedBold"
              fontSize={20}
              color="darkText"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export const PlaybookCarousel: React.FC<PlaybookCarouselProps> = props => {
  const initiallySelectedPlay = React.useMemo(() => {
    return props.plays.filter(play => {
      return play.id === props.selectedPlayCall.playSnapshotId;
    })[0];
  }, [props.plays, props.selectedPlayCall]);

  const [selectedPlay, setSelectedPlay] = React.useState(initiallySelectedPlay);

  const [navLevel, setNavLevel] = React.useState<_NavigationLevel>(
    _NavigationLevel.NavPlay,
  );
  const [formation, setFormation] = React.useState<Formation | undefined>(
    props.plays.filter(play => {
      return play.id === props.selectedPlayCall.playSnapshotId;
    })[0].formation,
  );

  const [calledTimeout, setCalledTimeout] = React.useState(false);
  const [isNoHuddle, setIsNoHuddle] = React.useState(false);
  const [isHurryUp, setIsHurryUp] = React.useState(false);

  const [playCarouselCurrentIndex, setPlayCarouselCurrentIndex] =
    React.useState<number | null>(
      props.plays
        .filter(play => {
          return play.formation === selectedPlay.formation;
        })
        .findIndex(play => {
          return play.id === selectedPlay.id;
        }),
    );

  const flatListRef = React.useRef<RNFlatList<_CarouselItem>>(null);

  const handleOnViewableItemsChanged = React.useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      console.log(viewableItems);
      setPlayCarouselCurrentIndex(viewableItems[0].index);
    },
    [],
  );

  const getItemLayout = (_data: any, index: number) => ({
    length: 300,
    offset: 300 * index,
    index,
  });

  const formations = React.useMemo(() => {
    return uniq(
      props.plays.map(play => {
        return play.formation;
      }),
    );
  }, [props.plays]);

  React.useEffect(() => {
    if (navLevel === _NavigationLevel.NavPlay && selectedPlay) {
      console.log('setting scroll index', selectedPlay.name);
      flatListRef.current?.scrollToIndex({
        animated: false,
        index: props.plays
          .filter(play => {
            return play.formation === selectedPlay.formation;
          })
          .findIndex(play => {
            return play.id === selectedPlay.id;
          }),
      });
    }
  }, [navLevel, selectedPlay, props.plays]);

  return (
    <>
      <View
        row
        w="full"
        bg="darkText"
        borderTopRadius={10}
        borderTopColor="black"
        borderTopWidth={1}
        mt={-1}
        py={8}
        px={10}
        alignItems="center"
        justifyContent="space-between">
        {navLevel === _NavigationLevel.NavFormation ? (
          <Text
            text="PLAY CALL"
            typeFace="sourceSansProBold"
            fontSize={15}
            color="white"
          />
        ) : navLevel === _NavigationLevel.NavPlayDetail ? (
          <View
            row
            onPress={() => {
              setNavLevel(_NavigationLevel.NavPlay);
            }}
            alignItems="center">
            <Icon icon="chevron-left" color="white" size={10} />
            <Text
              ml={5}
              text={selectedPlay.name.toUpperCase()}
              color="white"
              fontSize={15}
              typeFace="sourceSansProBold"
            />
          </View>
        ) : (
          <View
            row
            onPress={() => {
              setSelectedPlay(
                props.plays.filter(play => {
                  return play.formation === formation;
                })[0],
              );
              setNavLevel(_NavigationLevel.NavFormation);
            }}
            alignItems="center">
            <Icon icon="chevron-left" color="white" size={10} />
            <Text
              ml={5}
              text={`${GameEngine.getFormationName(
                formation!,
              )}-${playCarouselCurrentIndex}`}
              color="white"
              fontSize={15}
              typeFace="sourceSansProBold"
            />
          </View>
        )}

        <View row>
          <CircleCloseButton
            onPress={() => {
              setFormation(selectedPlay.formation);
              props.onClose();
            }}
          />
        </View>
      </View>
      <View w="full" flex={1} alignItems="center" justifyContent="center">
        {navLevel === _NavigationLevel.NavFormation ||
        navLevel === _NavigationLevel.NavPlay ? (
          <>
            <FlatList
              myRef={flatListRef}
              data={
                navLevel === _NavigationLevel.NavFormation
                  ? formations.map((thisFormation, index) => {
                      return {
                        id: `${GameEngine.getFormationName(
                          thisFormation,
                        )}-${index}`,
                        type: _CarouselItemType.ITFormation,
                        onSelect: () => {
                          setNavLevel(_NavigationLevel.NavPlay);
                        },
                      };
                    })
                  : props.plays.map((play, index) => {
                      return {
                        id: `${play.name}-${index}`,
                        type: _CarouselItemType.ITPlay,
                        play,
                        onSelect: () => {
                          setSelectedPlay(play);
                          setNavLevel(_NavigationLevel.NavPlayDetail);
                        },
                      };
                    })
              }
              renderItem={({item}) => <_RenderCarouselItem item={item} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              decelerationRate="fast"
              snapToInterval={302}
              snapToAlignment="start"
              getItemLayout={getItemLayout}
              onViewableItemsChanged={handleOnViewableItemsChanged}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 100,
              }}
            />
            <View
              row
              mt={-20}
              h={30}
              alignItems="center"
              justifyContent="center">
              {props.plays.map((_, index) => {
                return (
                  <View
                    key={index}
                    w={10}
                    h={10}
                    my={5}
                    mx={2}
                    bg={
                      playCarouselCurrentIndex === index
                        ? 'primary'
                        : 'disabled'
                    }
                    borderRadius="circle"
                  />
                );
              })}
            </View>
          </>
        ) : (
          <>
            <View
              row
              flex={1}
              w="full"
              alignItems="center"
              justifyContent="center">
              <View flex={1}>
                <View
                  flex={1}
                  w="full"
                  p={14}
                  alignItems="flex-start"
                  justifyContent="flex-start">
                  <View flex={1} w="full">
                    <View row alignItems="center">
                      <View>
                        <Icon icon="users-cog" color="primary" size={10} />
                      </View>
                      <Text
                        ml={5}
                        flex={1}
                        borderBottomColor="darkText"
                        borderBottomWidth={1}
                        text="Pass Targets"
                        color="primary"
                        typeFace="sourceSansProSemibold"
                        fontSize={15}
                      />
                    </View>
                    <View row ml={10} mt={5} alignItems="center">
                      <Text
                        ml={5}
                        flex={1}
                        text="X Deep Out (#82)"
                        color="darkText"
                        typeFace="sourceSansProSemibold"
                        fontSize={13}
                      />
                      <View ml={0}>
                        <Icon icon="caret-up" color="darkText" size={12} />
                      </View>
                      <View ml={5}>
                        <Icon icon="caret-down" color="darkText" size={12} />
                      </View>
                    </View>
                    <View ml={10}>
                      <HorizontalSeparator />
                    </View>
                    <View row ml={10} mt={0} alignItems="center">
                      <Text
                        ml={5}
                        flex={1}
                        text="Y Curl (#84)"
                        color="darkText"
                        typeFace="sourceSansProSemibold"
                        fontSize={13}
                      />
                      <View ml={0}>
                        <Icon icon="caret-up" color="darkText" size={12} />
                      </View>
                      <View ml={5}>
                        <Icon icon="caret-down" color="darkText" size={12} />
                      </View>
                    </View>
                    <View ml={10}>
                      <HorizontalSeparator />
                    </View>
                    <View row ml={10} mt={0} alignItems="center">
                      <Text
                        ml={5}
                        flex={1}
                        text="Z Corner (#88)"
                        color="darkText"
                        typeFace="sourceSansProSemibold"
                        fontSize={13}
                      />
                      <View ml={0}>
                        <Icon icon="caret-up" color="darkText" size={12} />
                      </View>
                      <View ml={5}>
                        <Icon icon="caret-down" color="darkText" size={12} />
                      </View>
                    </View>
                    <View ml={10}>
                      <HorizontalSeparator />
                    </View>
                    <View row ml={10} mt={0} alignItems="center">
                      <Text
                        ml={5}
                        flex={1}
                        text="A Flat (#23)"
                        color="darkText"
                        typeFace="sourceSansProSemibold"
                        fontSize={13}
                      />
                      <View ml={0}>
                        <Icon icon="caret-up" color="darkText" size={12} />
                      </View>
                      <View ml={5}>
                        <Icon icon="caret-down" color="darkText" size={12} />
                      </View>
                    </View>
                    <View ml={10}>
                      <HorizontalSeparator />
                    </View>
                    <View row ml={10} mt={0} alignItems="center">
                      <Text
                        ml={5}
                        flex={1}
                        text="B Middle Curl (#42)"
                        color="darkText"
                        typeFace="sourceSansProSemibold"
                        fontSize={13}
                      />
                      <View ml={0}>
                        <Icon icon="caret-up" color="darkText" size={12} />
                      </View>
                      <View ml={5}>
                        <Icon icon="caret-down" color="darkText" size={12} />
                      </View>
                    </View>
                  </View>
                  <View w="full">
                    <View row alignItems="center">
                      <View>
                        <Icon icon="stopwatch" color="primary" size={10} />
                      </View>
                      <Text
                        ml={5}
                        flex={1}
                        borderBottomColor="darkText"
                        borderBottomWidth={1}
                        text="Time Management"
                        color="primary"
                        typeFace="sourceSansProSemibold"
                        fontSize={15}
                      />
                    </View>
                    <View>
                      <View row mt={5} alignItems="center">
                        <View
                          row
                          alignItems="center"
                          onPress={() => {
                            setCalledTimeout(!calledTimeout);
                          }}>
                          <View>
                            <Icon icon="history" color="darkText" size={8} />
                          </View>
                          <View ml={5}>
                            <ToggleButton isOn={calledTimeout} />
                          </View>
                        </View>

                        <View
                          row
                          alignItems="center"
                          onPress={() => {
                            setIsNoHuddle(isHurryUp || !isNoHuddle);
                          }}>
                          <View ml={20}>
                            <Icon
                              icon="users-slash"
                              color="darkText"
                              size={8}
                            />
                          </View>
                          <View ml={5}>
                            <ToggleButton isOn={isNoHuddle} />
                          </View>
                        </View>

                        <View
                          row
                          alignItems="center"
                          onPress={() => {
                            setIsNoHuddle(true);
                            setIsHurryUp(!isHurryUp);
                          }}>
                          <View ml={20}>
                            <Icon icon="running" color="darkText" size={10} />
                          </View>
                          <View ml={5}>
                            <ToggleButton isOn={isHurryUp} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View flex={1} w="full" justifyContent="flex-end">
                  <View p={10}>
                    <IconButton
                      icon="arrow-alt-circle-right"
                      color="primary"
                      size={22}
                      onPress={() => {
                        const newSelectedPlayCall = new PlayCallDto().init({
                          ...props.selectedPlayCall.toPlainObject(),
                          playSnapshotId: selectedPlay.id,
                        });
                        props.onSelect(newSelectedPlayCall);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
};
