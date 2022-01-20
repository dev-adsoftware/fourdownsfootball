import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from '../screens/auth/signin';
import {SignUpScreen} from '../screens/auth/signup';
import {SignUpConfirmationScreen} from '../screens/auth/signup-confirmation';
import {ForgotPasswordScreen} from '../screens/auth/forgot-password';
import {ResetPasswordScreen} from '../screens/auth/reset-password';
import {useTheme} from '../providers/theme';

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
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.link,
        headerTitleStyle: {color: theme.colors.text},
        // headerBackTitleVisible: false,
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
