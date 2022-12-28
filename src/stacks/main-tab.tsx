import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SplashScreen} from '../screens/splash';
import {Splash2Screen} from '../screens/splash2';
import {MainTabBar} from '../components/composites/main-tab-bar';
import {Icon} from '../components/primitives/icon';

type Properties = {};

export type MainTabParamList = {
  Dashboard: undefined;
  Notifications: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabStack: React.FC<Properties> = ({}) => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Dashboard"
        tabBar={props => (
          <MainTabBar
            {...props}
            onPressNewGameButton={async () => {
              console.log('pressed new game button');
            }}
          />
        )}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={SplashScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="home"
                variant={focused ? 'primary' : 'disabled'}
                size="lg"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Splash2Screen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="bell"
                variant={focused ? 'primary' : 'disabled'}
                size="lg"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export {MainTabStack};
