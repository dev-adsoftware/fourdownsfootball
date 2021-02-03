import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Dashboard from '../../dashboard/navigator';
import Teams from '../../teams/main';
import Leagues from '../../leagues/main';
import Ladders from '../../ladders/main';

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
            component={Dashboard}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Teams"
            component={Teams}
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
            component={Leagues}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon="columns" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Ladders"
            component={Ladders}
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
