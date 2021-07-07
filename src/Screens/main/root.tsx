import React from 'react';
import { useAuth } from '../../providers/auth';
import AuthMain from '../auth/main';
import Splash from '../splash';
import { DataProvider } from '../../providers/data';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../../providers/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DashboardRoot from '../dashboard/root';
import TeamsRoot from '../teams/root';
import LeaguesRoot from '../leagues/root';
import LaddersRoot from '../ladders/root';
import { useNotification } from '../../providers/notification';

const Tab = createBottomTabNavigator();

export default () => {
  const auth = useAuth();
  const theme = useTheme();
  const notification = useNotification();

  React.useEffect(() => {
    notification.configure();
  });

  return (
    <>
      {auth.isLoading ? (
        <>
          <Splash />
        </>
      ) : auth.owner.id === undefined ? (
        <>
          <AuthMain />
        </>
      ) : (
        <>
          <DataProvider>
            <NavigationContainer theme={theme.mapToNavigation()}>
              <Tab.Navigator
                tabBarOptions={{
                  showLabel: true,
                }}>
                <Tab.Screen
                  name="Dashboard"
                  component={DashboardRoot}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesomeIcon icon="home" color={color} size={size} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Teams"
                  component={TeamsRoot}
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
                  component={LeaguesRoot}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesomeIcon
                        icon="columns"
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Ladders"
                  component={LaddersRoot}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesomeIcon icon="list" color={color} size={size} />
                    ),
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </DataProvider>
        </>
      )}
    </>
  );
};
