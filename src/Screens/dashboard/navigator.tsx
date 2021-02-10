import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from '../home/toolbar';
import DashboardMain from './main';

type DashboardStackParamList = {
  Dashboard: undefined;
};

const Stack = createStackNavigator<DashboardStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: Toolbar,
        }}>
        <Stack.Screen name="Dashboard" component={DashboardMain} />
      </Stack.Navigator>
    </>
  );
};
