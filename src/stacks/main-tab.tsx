import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LeaguesStack} from './leagues';
import {TeamsStack} from './teams';
import {useTheme} from '../providers/theme';
import {GamesStack} from './games';
import {MoreStack} from './more';
import {NotificationsStack} from './notifications';

type Properties = {};

export type MainTabParamList = {
  'Leagues Stack': undefined;
  'Teams Stack': undefined;
  'Games Stack': undefined;
  'Notifications Stack': undefined;
  'More Stack': undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Games Stack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.secondaryBackground,
          borderTopWidth: 1,
          borderTopColor: theme.colors.separator,
          // shadowColor: '#000',
          // shadowOpacity: 0.2,
          // shadowRadius: 5,
          // shadowOffset: {width: 0, height: 0},
          // elevation: 3,
        },
        tabBarActiveTintColor: theme.colors.text, //theme.colors.black,
        tabBarInactiveTintColor: theme.colors.placeholderText,
      }}>
      <Tab.Screen
        name="Teams Stack"
        component={TeamsStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="users" color={color} size={size} />
          ),
          tabBarLabel: 'Teams',
        }}
      />
      <Tab.Screen
        name="Leagues Stack"
        component={LeaguesStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="list" color={color} size={size} />
          ),
          tabBarLabel: 'Leagues',
        }}
      />
      <Tab.Screen
        name="Games Stack"
        component={GamesStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="football-ball" color={color} size={size} />
          ),
          tabBarLabel: 'Games',
        }}
      />
      <Tab.Screen
        name="Notifications Stack"
        component={NotificationsStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="bell" color={color} size={size} solid />
          ),
          tabBarLabel: 'Notifications',
        }}
      />
      <Tab.Screen
        name="More Stack"
        component={MoreStack}
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
