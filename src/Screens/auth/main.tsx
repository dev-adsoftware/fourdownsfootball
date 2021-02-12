import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from '../../providers/theme';

import SignIn from './signin';
import SignUp from './signup';
import Confirm from './confirm';
import Forgot from './forgot';
import ResetPassword from './reset-password';

export type AuthStackParamList = {
  'Sign In': undefined;
  'Sign Up': undefined;
  'Forgot Password': undefined;
  Confirm: { username: string };
  'Reset Password': { username: string };
};

const Stack = createStackNavigator<AuthStackParamList>();

export default () => {
  const theme = useTheme();
  return (
    <>
      <NavigationContainer theme={theme.mapToNavigation()}>
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Confirm" component={Confirm} />
          <Stack.Screen name="Forgot Password" component={Forgot} />
          <Stack.Screen name="Reset Password" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
