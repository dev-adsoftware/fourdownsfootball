import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TempScreen} from '../screens/temp';
import {HomeStack} from './home-tab/home';
import {TeamsStack} from './teams-tab/teams';
import {useTheme} from '../providers/theme';

type Properties = {};

export type MainTabParamList = {
  'Home Tab': undefined;
  'Teams Tab': undefined;
  'Games Tab': undefined;
  'Notifications Tab': undefined;
  'More Tab': undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.secondaryBackground,
        },
        tabBarActiveTintColor: theme.colors.blue,
        tabBarInactiveTintColor: theme.colors.placeholderText,
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
        component={TeamsStack}
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
        name="Notifications Tab"
        component={TempScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="bell" color={color} size={size} solid />
          ),
          tabBarLabel: 'Notifications',
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
