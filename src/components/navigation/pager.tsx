import React from 'react';
import {
  ScrollView as RNScrollView,
  FlatList as RNFlatList,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import {FlatList} from '../primitives/flatlist';
import {Pressable} from '../primitives/pressable';
import {ScrollView} from '../primitives/scroll-view';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';

export interface Page {
  name: string;
  component: React.ReactNode;
}

interface PagerProps {
  pages: Page[];
}

const DISTANCE_BETWEEN_TABS = 30;
const DEFAULT_SCROLLBAR_WIDTH = 1000;

const _Label: React.FC<{
  name: string;
  selected?: boolean;
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
}> = props => {
  const [width, setWidth] = React.useState(0);
  return (
    <View alignItems="center" px={DISTANCE_BETWEEN_TABS / 2}>
      <Pressable onPress={props.onPress}>
        <Text
          text={props.name}
          color="primaryText"
          fontSize="body"
          typeFace={
            props.selected
              ? 'klavikaCondensedMedium'
              : 'klavikaCondensedRegular'
          }
          opacity={props.selected ? 1.0 : 0.5}
          onLayout={(e: LayoutChangeEvent) => {
            setWidth(e.nativeEvent.layout.width);
            props.onLayout(e);
          }}
        />
      </Pressable>
      <View h={3} w={width} bg={props.selected ? 'primaryText' : undefined} />
    </View>
  );
};

export const Pager: React.FC<PagerProps> = props => {
  const [currentScreenIndex, setCurrentScreenIndex] = React.useState(0);
  const [isLayoutComplete, setIsLayoutComplete] = React.useState(false);
  const [scrollBarWidth, setScrollBarWidth] = React.useState<number>(
    DEFAULT_SCROLLBAR_WIDTH,
  );
  const tabWidthsRef = React.useRef<(number | undefined)[]>([]);
  const scrollViewRef = React.useRef<RNScrollView>(null);
  const flatListRef = React.useRef<RNFlatList<any>>(null);

  const {width} = useWindowDimensions();

  React.useEffect(() => {
    if (isLayoutComplete && scrollBarWidth === DEFAULT_SCROLLBAR_WIDTH) {
      const accumulatedWidth = props.pages.reduce((prev, _, i) => {
        return prev + (tabWidthsRef.current[i] || 0);
      }, 0);
      setScrollBarWidth(Math.max(accumulatedWidth, width));
    }
  }, [props.pages, isLayoutComplete, scrollBarWidth, width]);

  React.useEffect(() => {
    const accumulatedWidth = props.pages
      .slice(0, currentScreenIndex + 1)
      .reduce((prev, _, i) => {
        return prev + (tabWidthsRef.current[i] || 0);
      }, 0);
    scrollViewRef.current?.scrollTo({
      x: accumulatedWidth > width ? accumulatedWidth - width : 0,
    });
  }, [props.pages, currentScreenIndex, width]);

  const getItemLayout = (_data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <>
      <View row bg="white">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentProps={{w: scrollBarWidth}}
          ref={scrollViewRef}>
          {props.pages.map((page, index) => {
            return (
              <_Label
                key={page.name}
                name={page.name}
                selected={currentScreenIndex === index}
                onPress={() => {
                  setCurrentScreenIndex(index);
                  if (flatListRef.current) {
                    flatListRef.current.scrollToIndex({
                      animated: true,
                      index: index,
                    });
                  }
                }}
                onLayout={(event: LayoutChangeEvent) => {
                  const {width: layoutWidth} = event.nativeEvent.layout;
                  tabWidthsRef.current[index] =
                    layoutWidth + DISTANCE_BETWEEN_TABS;
                  if (!tabWidthsRef.current.includes(undefined)) {
                    setIsLayoutComplete(true);
                  }
                }}
              />
            );
          })}
        </ScrollView>
      </View>
      <View flex={1}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={props.pages}
          renderItem={({item}) => {
            return (
              <View w={width} alignItems="center">
                {item.component}
              </View>
            );
          }}
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={0}
          scrollEnabled={false}
        />
      </View>
    </>
  );
};
