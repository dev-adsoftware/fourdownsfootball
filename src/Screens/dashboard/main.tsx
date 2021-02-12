import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '../../providers/theme';
import Current from './current';
import History from './history';

const Tab = createMaterialTopTabNavigator();

export default () => {
  const theme = useTheme();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Current" component={Current} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};
