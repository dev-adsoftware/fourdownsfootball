import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from './toolbar';
import DashboardList from './list';
import DashboardGamesInProgress from './games-in-progress';
import DashboardRecentGames from './recent-games';
import DashboardGameRequests from './game-requests';

export type DashboardStackParamList = {
  DashboardList: {};
  GamesInProgress: {};
  RecentGames: {};
  GameRequests: {};
};

const Stack = createStackNavigator<DashboardStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => {
            return (
              <>
                <Toolbar />
              </>
            );
          },
        }}>
        <Stack.Screen name="DashboardList" component={DashboardList} />
        <Stack.Screen
          name="GamesInProgress"
          component={DashboardGamesInProgress}
        />
        <Stack.Screen name="RecentGames" component={DashboardRecentGames} />
        <Stack.Screen name="GameRequests" component={DashboardGameRequests} />
      </Stack.Navigator>
    </>
  );
};
