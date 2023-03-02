import {uniq} from 'lodash';
import React from 'react';
import {FlatList as RNFlatList, ViewToken} from 'react-native';
import {PlaySnapshotDto} from '../../services/dtos';
import {Formation} from '../../services/dtos/types/formation';
import {GameEngine} from '../../utilities/game-engine';
import {IconButton} from '../buttons/icon-button';
import {FlatList} from '../primitives/flatlist';
import {Icon} from '../primitives/icon';
import {Pressable} from '../primitives/pressable';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';

interface PlaybookCarouselProps {
  plays: PlaySnapshotDto[];
  selectedPlay: PlaySnapshotDto;
  onSelect: (play: string) => void;
}

interface _CarouselItem {
  id: string;
  onSelect: () => void;
}

const _RenderCarouselItem = ({item}: {item: _CarouselItem}) => {
  return (
    <View
      flex={1}
      w={300}
      px={20}
      pt={20}
      bg="oddLayerSurface"
      alignItems="center"
      justifyContent="center">
      <Pressable
        w="full"
        flex={1}
        borderWidth={1}
        borderColor="primaryText"
        alignItems="center"
        justifyContent="center"
        onPress={() => {
          item.onSelect();
        }}>
        <Text
          text={item.id}
          typeFace="klavikaCondensedBoldItalic"
          fontSize="title1"
          color="primaryText"
        />
      </Pressable>
    </View>
  );
};

export const PlaybookCarousel: React.FC<PlaybookCarouselProps> = props => {
  const [formation, setFormation] = React.useState<Formation | undefined>(
    props.selectedPlay.formation,
  );

  const [playCarouselCurrentIndex, setPlayCarouselCurrentIndex] =
    React.useState<number | null>(
      props.plays
        .filter(play => {
          return play.formation === props.selectedPlay.formation;
        })
        .findIndex(play => {
          return play.id === props.selectedPlay.id;
        }),
    );

  const flatListRef = React.useRef<RNFlatList<_CarouselItem>>(null);

  const handleOnViewableItemsChanged = React.useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
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

  return (
    <>
      <View
        row
        w="full"
        bg="primaryText"
        borderTopRadius={10}
        borderTopColor="black"
        borderTopWidth={1}
        mt={-1}
        py={8}
        px={10}
        alignItems="center"
        justifyContent="space-between">
        {formation === undefined ? (
          <Text
            text="PLAY CALL"
            typeFace="sourceSansProBold"
            fontSize="subhead"
            color="white"
          />
        ) : (
          <Pressable
            onPress={() => {
              setFormation(undefined);
            }}>
            <View row alignItems="center">
              <Icon name="chevron-left" color="white" size="xs" />
              <Text
                ml={5}
                text={`${GameEngine.getFormationName(
                  formation,
                )}-${playCarouselCurrentIndex}`}
                color="white"
                fontSize="subhead"
                typeFace="sourceSansProBold"
              />
            </View>
          </Pressable>
        )}
        <View row>
          {/* {mode === 'formation' ? (
            <View
              borderColor="white"
              borderWidth={1}
              px={6}
              py={2}
              bg={mode === 'formation' ? 'primary' : undefined}>
              <Text
                text="FORMATION"
                typeFace="klavikaCondensedBold"
                fontSize="subhead"
                color="white"
              />
            </View>
          ) : (
            <></>
          )} */}
          <View
            borderColor="oddLayerSurface"
            borderWidth={1}
            px={6}
            py={2}
            ml={4}
            bg="primary">
            <Text
              text="SUGGEST"
              typeFace="klavikaCondensedBold"
              fontSize="subhead"
              color="white"
            />
          </View>
        </View>
      </View>
      <View w="full" flex={1} alignItems="center" justifyContent="center">
        <FlatList
          myRef={flatListRef}
          data={
            formation === undefined
              ? formations.map((thisFormation, index) => {
                  return {
                    id: `${GameEngine.getFormationName(
                      thisFormation,
                    )}-${index}`,
                    onSelect: () => {
                      console.log('setting formation', thisFormation);
                      setFormation(thisFormation);
                    },
                  };
                })
              : props.plays.map((play, index) => {
                  return {
                    id: `${play.name}-${index}`,
                    onSelect: () => {
                      console.log('setting play', play.id);
                      props.onSelect(play.name);
                      // props.onSelect(play);
                    },
                  };
                })
          }
          renderItem={_RenderCarouselItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={300}
          snapToAlignment="start"
          getItemLayout={getItemLayout}
          //   onViewableItemsChanged={handleOnViewableItemsChanged}
        />
        <View row h={40} alignItems="center" justifyContent="center">
          {props.plays.map((_, index) => {
            return (
              <View
                key={index}
                w={10}
                h={10}
                mx={2}
                bg={playCarouselCurrentIndex === index ? 'primary' : 'disabled'}
                borderRadius="circle"
              />
            );
          })}
        </View>
        <View
          position="absolute"
          bottom={0}
          left={0}
          h={30}
          w={69}
          bg="primary"
          borderTopWidth={1}
          borderRightWidth={1}
          borderColor="primaryText"
          alignItems="center"
          justifyContent="center">
          <IconButton
            onPress={() => {}}
            icon="caret-down"
            color="white"
            size="3xl"
          />
        </View>
      </View>
    </>
  );
};
