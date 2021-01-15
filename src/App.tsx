// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './Providers/AuthProvider';
import { ThemeProvider } from './Providers/ThemeProvider';
import { EnvProvider } from './Providers/EnvProvider';
import Splash from './Screens/Splash';
import Home from './Screens/Home';
import Login from './Screens/Login';
import theme from './theme.json';
import env from './env.json';

const Stack = createStackNavigator();

const AppWithAuthContext = () => {
  const { state: authState } = useAuth();

  if (authState.status === 'initializing') {
    return <Splash />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {authState.status === 'error' || authState.status === 'validating' ? (
            <Stack.Screen name="Login" component={Login} />
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default () => {
  return (
    <>
      <EnvProvider initialEnv={env}>
        <AuthProvider>
          <ThemeProvider initialTheme={theme}>
            <AppWithAuthContext />
          </ThemeProvider>
        </AuthProvider>
      </EnvProvider>
    </>
  );
};
