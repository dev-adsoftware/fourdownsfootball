import React from 'react';
import {
  ScrollView as RNScrollView,
  LayoutChangeEvent,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {Pressable} from '../primitives/pressable';
import {ScrollView} from '../primitives/scroll-view';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';

export interface NavPage {
  name: string;
  component: React.ReactNode;
}

interface NavPagerProps {
  pages: NavPage[];
  width?: number;
}

const DISTANCE_BETWEEN_LABELS = 30;
const DEFAULT_SCROLLBAR_WIDTH = 1000;

const _Label: React.FC<{
  name: string;
  selected?: boolean;
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
}> = props => {
  const [width, setWidth] = React.useState(0);
  return (
    <View alignItems="center" px={DISTANCE_BETWEEN_LABELS / 2}>
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

export const NavPager: React.FC<NavPagerProps> = props => {
  const [currentScreenIndex, setCurrentScreenIndex] = React.useState(0);
  const [isLayoutComplete, setIsLayoutComplete] = React.useState(false);
  const [scrollBarWidth, setScrollBarWidth] = React.useState<number>(
    DEFAULT_SCROLLBAR_WIDTH,
  );
  const tabWidthsRef = React.useRef<(number | undefined)[]>([]);
  const scrollViewRef = React.useRef<RNScrollView>(null);
  const {current: scrollValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  const {width: windowWidth} = useWindowDimensions();
  const width = React.useMemo(
    () => props.width || windowWidth,
    [props.width, windowWidth],
  );

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

  React.useEffect(() => {
    Animated.timing(scrollValue, {
      toValue: currentScreenIndex,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [currentScreenIndex, scrollValue]);

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
                }}
                onLayout={(event: LayoutChangeEvent) => {
                  const {width: layoutWidth} = event.nativeEvent.layout;
                  tabWidthsRef.current[index] =
                    layoutWidth + DISTANCE_BETWEEN_LABELS;
                  if (!tabWidthsRef.current.includes(undefined)) {
                    setIsLayoutComplete(true);
                  }
                }}
              />
            );
          })}
        </ScrollView>
      </View>
      <View
        animated
        flex={1}
        w={width * Math.max(props.pages.length, 2)}
        animatedTranslateX={{
          animatedValue: scrollValue,
          range: [0, -width],
        }}>
        <View flex={1} row>
          {props.pages.map((page, index) => {
            return (
              <View key={index} w={width} flex={1}>
                {page.component}
              </View>
            );
          })}
        </View>

        {/* <FlatList
          myRef={flatListRef}
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
        /> */}
      </View>
    </>
  );
};
