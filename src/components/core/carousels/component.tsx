import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Dimensions,
  ViewToken,
} from 'react-native';
import {useTheme} from '../../../providers/theme';
import {Button} from '../buttons/button';

export type CarouselItem = {
  id: number;
  component?: React.ReactNode;
};

type Properties = {
  items: CarouselItem[];
  showDisabledButtons?: boolean;
  disableNext?: boolean;
  showFooter?: boolean;
  showStaticFooter?: boolean;
  lastButton?: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
};

const Component: React.FC<Properties> = ({
  items,
  showDisabledButtons = true,
  disableNext = false,
  showFooter = true,
  showStaticFooter = false,
  lastButton,
  onNext,
  onPrev,
}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [dataWithPlaceholders, setDataWithPlaceholders] = React.useState<
    CarouselItem[]
  >([]);
  const [isNextDisabled, setIsNextDisabled] = React.useState(disableNext);
  const [isPrevDisabled, setIsPrevDisabled] = React.useState(true);

  const currentIndex = React.useRef<number>(1);
  const lastIndex = React.useRef<number>(items.length);
  const flatListRef = React.useRef<FlatList<any>>(null);

  React.useEffect(() => {
    setDataWithPlaceholders([{id: -1}, ...items, {id: items.length}]);
  }, [items]);

  const handleOnViewableItemsChanged = React.useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      const itemsInView = viewableItems.filter(
        ({item}: {item: CarouselItem}) => item.component,
      );

      if (itemsInView.length === 0) {
        return;
      }

      currentIndex.current = Number(itemsInView[0].index);
      setIsNextDisabled(currentIndex.current === lastIndex.current);
      setIsPrevDisabled(currentIndex.current === 1);
    },
    [],
  );

  const handleOnPrev = () => {
    if (currentIndex.current === 1) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current - 1,
      });
    }

    if (onPrev) {
      onPrev();
    }
  };

  const handleOnNext = () => {
    if (currentIndex.current === items.length) {
      return;
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current + 1,
      });
    }

    if (onNext) {
      onNext();
    }
  };

  const getItemLayout = (_data: any, index: number) => ({
    length: width,
    offset: width * (index - 1),
    index,
  });

  const theme = useTheme();

  const {width} = Dimensions.get('window');
  //   const SPACING = 5;
  const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      marginHorizontal: 30,
    },
    flatListContent: {},
    item: {},
    itemContainer: {width},
    emptyItemContent: {width: 0},
    itemContent: {
      //   marginHorizontal: SPACING * 3,
    },
    buttonOutline: {
      borderWidth: 1,
      paddingHorizontal: 20,
      borderColor: theme.colors.blue,
      borderRadius: 15,
    },
    arrowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    emptyButtonContainer: {
      width: 1,
    },
  });

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={dataWithPlaceholders}
        renderItem={({item}) => {
          if (!item.component) {
            return <View style={[styles.emptyItemContent]} />;
          }

          return (
            <>
              <View style={[styles.itemContainer]}>
                <Animated.View style={[styles.itemContent]}>
                  {item.component}
                </Animated.View>
                {showFooter ? (
                  <View style={styles.footer}>
                    {isPrevDisabled && !showDisabledButtons ? (
                      <View style={[styles.emptyButtonContainer]} />
                    ) : (
                      <Button
                        text="Prev"
                        compact
                        filled={false}
                        disabled={isPrevDisabled}
                        iconLeft="caret-left"
                        onPress={handleOnPrev}
                      />
                    )}
                    {lastButton && isNextDisabled ? (
                      lastButton
                    ) : isNextDisabled && !showDisabledButtons ? (
                      <View style={[styles.emptyButtonContainer]} />
                    ) : (
                      <Button
                        text="Next"
                        compact
                        filled={false}
                        disabled={isNextDisabled}
                        iconRight="caret-right"
                        onPress={handleOnNext}
                      />
                    )}
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </>
          );
        }}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={width}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
      {showStaticFooter ? (
        <View style={styles.footer}>
          <Button
            text="Prev"
            compact
            disabled={isPrevDisabled}
            iconLeft="caret-left"
            onPress={handleOnPrev}
          />
          {lastButton && isNextDisabled ? (
            lastButton
          ) : (
            <Button
              text="Next"
              compact
              disabled={isNextDisabled}
              iconRight="caret-right"
              onPress={handleOnNext}
            />
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
export {Component as ComponentCarousel};
