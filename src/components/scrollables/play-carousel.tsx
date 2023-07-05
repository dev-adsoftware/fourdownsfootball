import React from 'react';
import {FlatList as RNFlatList, ViewToken} from 'react-native';
import {PLAY_SELECTOR_CAROUSEL_WIDTH} from '../../constants';
import {FlatList} from '../../primitives/flatlist';
import {Svg, SvgCircleProps, svgTriangleMarker} from '../../primitives/svg';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {PlaySnapshotDto} from '../../services/dtos';
import {Alignment} from '../../services/dtos/types/alignment';

interface PlayCarouselProps {
  plays: PlaySnapshotDto[];
  initialPlay: PlaySnapshotDto;
  onSelect: (play: PlaySnapshotDto) => void;
}

interface _CarouselItem {
  play: PlaySnapshotDto;
  onSelect: () => void;
  index: number;
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
      w={PLAY_SELECTOR_CAROUSEL_WIDTH}
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
              h={155}
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
              text={props.item.play.name.toUpperCase()}
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

const getItemLayout = (_data: any, index: number) => ({
  length: PLAY_SELECTOR_CAROUSEL_WIDTH,
  offset: PLAY_SELECTOR_CAROUSEL_WIDTH * index,
  index,
});

export const PlayCarousel: React.FC<PlayCarouselProps> = props => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState<number>(
    props.plays.findIndex(play => {
      return play === props.initialPlay;
    }) || 0,
  );

  const handleOnViewableItemsChanged = React.useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index!);
      }
    },
    [],
  );

  const flatListRef = React.useRef<RNFlatList<_CarouselItem>>(null);

  React.useEffect(() => {
    if (!isInitialized) {
      flatListRef.current?.scrollToIndex({
        animated: false,
        index: currentIndex,
      });
      setIsInitialized(true);
    }
  }, [currentIndex, isInitialized]);

  return (
    <>
      <FlatList
        myRef={flatListRef}
        data={props.plays.map((play, index) => {
          return {
            play: play,
            onSelect: () => {
              props.onSelect(play);
            },
            index,
          };
        })}
        renderItem={({item}) => <_RenderCarouselItem item={item} />}
        keyExtractor={item => String(item.play.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEnabled={props.plays.length > 1}
        decelerationRate="fast"
        snapToInterval={PLAY_SELECTOR_CAROUSEL_WIDTH}
        snapToAlignment="start"
        getItemLayout={getItemLayout}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        scrollEventThrottle={16}
      />
      <View row mt={-20} h={30} alignItems="center" justifyContent="center">
        {props.plays.map((_, index) => {
          return (
            <View
              key={index}
              w={10}
              h={10}
              my={5}
              mx={2}
              bg={currentIndex === index ? 'primary' : 'disabled'}
              borderRadius="circle"
            />
          );
        })}
      </View>
    </>
  );
};
