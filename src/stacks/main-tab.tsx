import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TempScreen} from '../screens/temp';
import {colorPalette} from '../providers/theme';
import {HomeStack} from './home';

type Properties = {};

export type MainTabParamList = {
  'Home Tab': undefined;
  'Teams Tab': undefined;
  'Games Tab': undefined;
  'More Tab': undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabStack: React.FC<Properties> = ({}) => {
  // const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorPalette.Cornsilk,
        },
        tabBarActiveTintColor: colorPalette['Kombu Green'],
        tabBarInactiveTintColor: colorPalette.Fawn,
      }}>
      <Tab.Screen
        name="Home Tab"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Teams Tab"
        component={TempScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="users" color={color} size={size} />
          ),
          tabBarLabel: 'Teams',
        }}
      />
      <Tab.Screen
        name="Games Tab"
        component={TempScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="football-ball" color={color} size={size} />
          ),
          tabBarLabel: 'Games',
        }}
      />
      <Tab.Screen
        name="More Tab"
        component={TempScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="ellipsis-h" color={color} size={size} />
          ),
          tabBarLabel: 'More',
        }}
      />
    </Tab.Navigator>
  );
};

export {MainTabStack};
