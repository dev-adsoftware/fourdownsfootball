import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import SignIn from '../signin';
import SignUp from '../signup';

const Stack = createStackNavigator();

export default () => {
  const theme = useTheme();
  return (
    <>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
