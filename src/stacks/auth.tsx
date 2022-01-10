import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from '../screens/signin';
import {SignUpScreen} from '../screens/signup';
import {SignUpConfirmationScreen} from '../screens/signup-confirmation';
import {ForgotPasswordScreen} from '../screens/forgot-password';
import {ResetPasswordScreen} from '../screens/reset-password';

type Properties = {};

export type AuthStackParamList = {
  'Sign In': undefined;
  'Sign Up': undefined;
  'Sign Up Confirmation': {username: string};
  'Forgot Password': undefined;
  'Reset Password': {username: string};
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC<Properties> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: {backgroundColor: 'blue'},
        headerTintColor: 'white',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen
        name="Sign Up Confirmation"
        component={SignUpConfirmationScreen}
      />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export {AuthStack};
