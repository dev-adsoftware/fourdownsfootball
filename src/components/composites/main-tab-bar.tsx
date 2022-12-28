import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {TAB_BAR_HEIGHT} from '../../constants/tab-bar';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-theme';
import {AnimatedContainer} from '../primitives/animated-container';
import {HStack} from '../primitives/h-stack';
import {PressableOpaque} from '../primitives/pressable';
import {CurvedTabBar} from './curved-tab-bar-svg';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {NewGameButton} from './new-game-button';

export interface MainTabBarProperties
  extends WithThemeStyleProps,
    BottomTabBarProps {
  onPressNewGameButton: () => Promise<void>;
}

const _MainTabBar: React.FC<MainTabBarProperties> = props => {
  const {state, descriptors, navigation, onPressNewGameButton} = props;

  const [isHidden, setIsHidden] = React.useState(false);
  const [isNewGameButtonRotated, setIsNewGameButtonRotated] =
    React.useState(false);
  const [isNewGameButtonWrapped, setIsNewGameButtonWrapped] =
    React.useState(true);

  const {current: slideInOutValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  React.useEffect(() => {
    if (isHidden) {
      setIsNewGameButtonRotated(true);
      setIsNewGameButtonWrapped(false);
      Animated.timing(slideInOutValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      setIsNewGameButtonRotated(false);
      Animated.timing(slideInOutValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsNewGameButtonWrapped(true);
      });
    }
  }, [isHidden, slideInOutValue]);

  const ss = StyleSheet.create({
    tabBarContainer: {
      height: TAB_BAR_HEIGHT,
      marginTop: -TAB_BAR_HEIGHT,
    },
    iconStack: {bottom: 70},
  });

  return (
    <>
      <AnimatedContainer
        transforms={[
          {
            translateY: slideInOutValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, TAB_BAR_HEIGHT],
            }),
          },
        ]}
        styles={['p-safe', ss.tabBarContainer]}>
        <CurvedTabBar />
        <HStack justify="space-around" styles={['w-full', ss.iconStack]}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({
                  name: route.name,
                  merge: true,
                  params: {},
                });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <PressableOpaque
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}>
                {options.tabBarIcon ? (
                  options.tabBarIcon({
                    focused: isFocused,
                    color: 'unused',
                    size: -1,
                  })
                ) : (
                  <></>
                )}
              </PressableOpaque>
            );
          })}
        </HStack>
      </AnimatedContainer>
      <NewGameButton
        rotated={isNewGameButtonRotated}
        wrapped={isNewGameButtonWrapped}
        onPress={() => {
          setIsHidden(!isHidden);
          onPressNewGameButton();
        }}
      />
    </>
  );
};

export const MainTabBar = withTheme(_MainTabBar);
