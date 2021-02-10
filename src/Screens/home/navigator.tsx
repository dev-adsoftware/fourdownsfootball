import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DashboardNavigator from '../dashboard/navigator';
import TeamsNavigator from '../teams/navigator';
import LeaguesNavigator from '../leagues/navigator';
import LaddersNavigator from '../ladders/navigator';

const Tab = createBottomTabNavigator();

export default () => {
  const theme = useTheme();

  return (
    <>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
          }}>
          <Tab.Screen
            name="Dashboard"
            component={DashboardNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Teams"
            component={TeamsNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon="football-ball"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Leagues"
            component={LeaguesNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon="columns" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Ladders"
            component={LaddersNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon="list" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};
