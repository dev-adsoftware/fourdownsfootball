import React from 'react';
import {SplashScreen} from '../screens/splash';
import {Animated, StyleSheet} from 'react-native';
import {TAB_BAR_HEIGHT} from '../constants/tab-bar';
import {Splash2Screen} from '../screens/splash2';
import {AnimatedContainer} from '../components/primitives/animated-container';
import {MainTabBar} from '../components/composites/main-tab-bar';
import {NewGameButton} from '../components/composites/new-game-button';

type Properties = {};

export type MainTabParamList = {
  Dashboard: undefined;
  Notifications: undefined;
};

const MainTabStack: React.FC<Properties> = ({}) => {
  const [currentScreen, setCurrentScreen] = React.useState('home');
  const [isTabBarHidden, setIsTabBarHidden] = React.useState(false);
  const [isNewGameButtonRotated, setIsNewGameButtonRotated] =
    React.useState(false);
  const [isNewGameButtonWrapped, setIsNewGameButtonWrapped] =
    React.useState(true);

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

  const ss = StyleSheet.create({
    tabBarContainer: {
      height: TAB_BAR_HEIGHT,
      marginTop: -TAB_BAR_HEIGHT,
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
    },
  });

  return (
    <>
      {currentScreen === 'home' ? (
        <Splash2Screen />
      ) : currentScreen === 'bell' ? (
        <SplashScreen />
      ) : (
        <SplashScreen />
        // <Animated.View
        //   style={{
        //     position: 'absolute',
        //     bottom: 0,
        //     transform: [
        //       {
        //         translateY: slideInOutValue.interpolate({
        //           inputRange: [0, 1],
        //           outputRange: [300, 0],
        //         }),
        //       },
        //     ],
        //   }}>
        //   <SplashScreen />
        // </Animated.View>
      )}
      <AnimatedContainer
        mt="tabBarHeight"
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
      </AnimatedContainer>
      <NewGameButton
        rotated={isNewGameButtonRotated}
        wrapped={isNewGameButtonWrapped}
        onPress={() => {
          setIsTabBarHidden(!isTabBarHidden);
          // setCurrentScreen(currentScreen === 'home' ? 'popup' : 'home');
        }}
      />
    </>
  );
};

export {MainTabStack};
