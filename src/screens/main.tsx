import React from 'react';
import {SplashScreen} from './splash';
import {Animated, useWindowDimensions} from 'react-native';
import {
  TAB_BAR_NEW_GAME_BUTTON_SIZE,
  TAB_BAR_HEIGHT,
} from '../constants/tab-bar';
import {MainTabBar} from '../components/navigation/main-tab-bar';
import {HomeScreen} from './home';
import {View} from '../components/primitives/view';
import {NewGameButton} from '../components/buttons/new-game-button';
import {Splash3Screen} from './splash3';

type Properties = {};

export const MainScreen: React.FC<Properties> = ({}) => {
  const [currentScreen, setCurrentScreen] = React.useState('home');
  const [isTabBarHidden, setIsTabBarHidden] = React.useState(false);
  const [isNewGameButtonRotated, setIsNewGameButtonRotated] =
    React.useState(false);
  const [isNewGameButtonWrapped, setIsNewGameButtonWrapped] =
    React.useState(true);

  const {height, width} = useWindowDimensions();

  const {current: slideInOutValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  React.useEffect(() => {
    if (isTabBarHidden) {
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
  }, [isTabBarHidden, slideInOutValue]);

  return (
    <>
      <View justifyContent="space-between">
        {currentScreen === 'home' ? <HomeScreen /> : <SplashScreen />}
        <View
          animated
          position="absolute"
          top={0}
          w="full"
          translateY={{
            animatedValue: slideInOutValue,
            range: [height, 0],
          }}>
          <Splash3Screen />
        </View>
        <View
          animated
          flex="none"
          mt={-TAB_BAR_HEIGHT}
          h={TAB_BAR_HEIGHT}
          translateY={{
            animatedValue: slideInOutValue,
            range: [0, TAB_BAR_HEIGHT],
          }}>
          <MainTabBar
            activeIcon={currentScreen}
            onPressHome={() => {
              setCurrentScreen('home');
            }}
            onPressBell={() => {
              setCurrentScreen('bell');
            }}
          />
        </View>
        <View
          flex="none"
          position="absolute"
          w={TAB_BAR_NEW_GAME_BUTTON_SIZE}
          h={TAB_BAR_NEW_GAME_BUTTON_SIZE}
          left={width / 2 - TAB_BAR_NEW_GAME_BUTTON_SIZE / 2}
          bottom={TAB_BAR_HEIGHT - TAB_BAR_NEW_GAME_BUTTON_SIZE}>
          <NewGameButton
            size={TAB_BAR_NEW_GAME_BUTTON_SIZE}
            rotated={isNewGameButtonRotated}
            wrapped={isNewGameButtonWrapped}
            onPress={() => {
              setIsTabBarHidden(!isTabBarHidden);
              // setCurrentScreen(currentScreen === 'home' ? 'popup' : 'home');
            }}
          />
        </View>
      </View>
    </>
  );
};
