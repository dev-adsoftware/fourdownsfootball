import React from 'react';
import {FlatList as RNFlatList, ViewToken} from 'react-native';
import {PLAY_SELECTOR_CAROUSEL_WIDTH} from '../../constants';
import {FlatList} from '../../primitives/flatlist';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {Formation} from '../../services/dtos/types/formation';
import {GameEngine} from '../../utilities/game-engine';

interface FormationCarouselProps {
  formations: Formation[];
  initialFormation: Formation;
  onSelect: (formation: Formation) => void;
}

interface _CarouselItem {
  formation: Formation;
  onSelect: () => void;
}

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
        <View flex={1} w="full" alignItems="center" justifyContent="center">
          <View flex={1} justifyContent="center">
            <Text
              text={GameEngine.getFormationName(props.item.formation)}
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

export const FormationCarousel: React.FC<FormationCarouselProps> = props => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(
    props.formations.findIndex(formation => {
      return formation === props.initialFormation;
    }) || 0,
  );

  const handleOnViewableItemsChanged = React.useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      console.log(viewableItems);
      setCurrentIndex(viewableItems[0].index || 0);
    },
    [],
  );

  const flatListRef = React.useRef<RNFlatList<_CarouselItem>>(null);

  React.useEffect(() => {
    flatListRef.current?.scrollToIndex({animated: false, index: currentIndex});
  }, [currentIndex]);

  return (
    <>
      <FlatList
        myRef={flatListRef}
        data={props.formations.map(formation => {
          return {
            formation: formation,
            onSelect: () => {
              props.onSelect(formation);
            },
          };
        })}
        renderItem={({item}) => <_RenderCarouselItem item={item} />}
        keyExtractor={item => String(item.formation)}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEnabled={props.formations.length > 1}
        decelerationRate="fast"
        snapToInterval={PLAY_SELECTOR_CAROUSEL_WIDTH + 2}
        snapToAlignment="start"
        getItemLayout={getItemLayout}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
      <View row mt={-20} h={30} alignItems="center" justifyContent="center">
        {props.formations.map((_, index) => {
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
