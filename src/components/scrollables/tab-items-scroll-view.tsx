import React from 'react';
import {
  LayoutChangeEvent,
  ScrollView as RNScrollView,
  useWindowDimensions,
} from 'react-native';
import {ScrollView} from '../../primitives/scroll-view';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {ThemeFontSizeKey} from '../../providers/theme';

interface TabItemsScrollViewProps {
  labels: string[];
  fontSize?: ThemeFontSizeKey;
  onSelect: (index: number) => void;
}

const DEFAULT_DISTANCE_BETWEEN_LABELS = 30;
const DEFAULT_SCROLLBAR_WIDTH = 1000;
const SCROLL_OVERFLOW = 50;
const DEFAULT_FONT_SIZE = 20;

const _Label: React.FC<{
  name: string;
  fontSize?: ThemeFontSizeKey;
  selected?: boolean;
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
}> = props => {
  const [width, setWidth] = React.useState(0);
  return (
    <View
      alignItems="center"
      px={
        (DEFAULT_DISTANCE_BETWEEN_LABELS *
          ((props.fontSize || DEFAULT_FONT_SIZE) / DEFAULT_FONT_SIZE)) /
        2
      }>
      <Text
        onPress={props.onPress}
        text={props.name}
        color="darkText"
        fontSize={props.fontSize || DEFAULT_FONT_SIZE}
        typeFace="klavikaCondensedMedium"
        opacity={props.selected ? 1.0 : 0.3}
        onLayout={(e: LayoutChangeEvent) => {
          setWidth(e.nativeEvent.layout.width);
          props.onLayout(e);
        }}
      />
      <View h={3} w={width} bg={props.selected ? 'darkText' : undefined} />
    </View>
  );
};

export const TabItemsScrollView: React.FC<TabItemsScrollViewProps> = props => {
  const [currentScreenIndex, setCurrentScreenIndex] = React.useState(0);
  const [isLayoutComplete, setIsLayoutComplete] = React.useState(false);
  const [scrollBarWidth, setScrollBarWidth] = React.useState<number>(
    DEFAULT_SCROLLBAR_WIDTH,
  );
  const tabWidthsRef = React.useRef<(number | undefined)[]>([]);
  const scrollViewRef = React.useRef<RNScrollView>(null);

  const {width} = useWindowDimensions();

  React.useEffect(() => {
    if (isLayoutComplete && scrollBarWidth === DEFAULT_SCROLLBAR_WIDTH) {
      const accumulatedWidth = props.labels.reduce((prev, _, i) => {
        return prev + (tabWidthsRef.current[i] || 0);
      }, 0);
      setScrollBarWidth(Math.max(accumulatedWidth, width));
    }
  }, [props.labels, isLayoutComplete, scrollBarWidth, width]);

  React.useEffect(() => {
    const accumulatedWidth = props.labels
      .slice(0, currentScreenIndex + 1)
      .reduce((prev, _, i) => {
        return prev + (tabWidthsRef.current[i] || 0);
      }, 0);
    scrollViewRef.current?.scrollTo({
      x:
        accumulatedWidth > width - SCROLL_OVERFLOW
          ? accumulatedWidth - width + SCROLL_OVERFLOW
          : 0,
    });
  }, [props.labels, currentScreenIndex, width]);

  return (
    <View row bg="white">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentProps={{w: scrollBarWidth}}
        ref={scrollViewRef}>
        {props.labels.map((label, index) => {
          return (
            <_Label
              key={label}
              name={label}
              fontSize={props.fontSize}
              selected={currentScreenIndex === index}
              onPress={() => {
                setCurrentScreenIndex(index);
                props.onSelect(index);
              }}
              onLayout={(event: LayoutChangeEvent) => {
                const {width: layoutWidth} = event.nativeEvent.layout;
                tabWidthsRef.current[index] =
                  layoutWidth +
                  DEFAULT_DISTANCE_BETWEEN_LABELS *
                    ((props.fontSize || DEFAULT_FONT_SIZE) / DEFAULT_FONT_SIZE);
                if (!tabWidthsRef.current.includes(undefined)) {
                  setIsLayoutComplete(true);
                }
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
