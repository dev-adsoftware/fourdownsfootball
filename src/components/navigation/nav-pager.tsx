import React from 'react';
import {useWindowDimensions, Animated} from 'react-native';
import {View} from '../../primitives/view';
import {TabItemsScrollView} from '../scrollables/tab-items-scroll-view';

export interface NavPage {
  name: string;
  component: React.ReactNode;
}

interface NavPagerProps {
  pages: NavPage[];
  width?: number;
  onSelect?: (index: number) => void;
}

export const NavPager: React.FC<NavPagerProps> = props => {
  const [currentScreenIndex, setCurrentScreenIndex] = React.useState(0);
  const {current: scrollValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  const {width: windowWidth} = useWindowDimensions();
  const width = React.useMemo(
    () => props.width || windowWidth,
    [props.width, windowWidth],
  );

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
        <TabItemsScrollView
          labels={props.pages.map(page => {
            return page.name;
          })}
          onSelect={index => {
            setCurrentScreenIndex(index);
            if (props.onSelect) {
              props.onSelect(index);
            }
          }}
        />
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
      </View>
    </>
  );
};
