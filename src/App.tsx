// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './Providers/AuthProvider';
import { ThemeProvider } from './Providers/ThemeProvider';
import Splash from './Screens/Splash';
import Home from './Screens/Home';
import Login from './Screens/Login';
import theme from './theme';

const Stack = createStackNavigator();

const AppWithAuthContext = () => {
  const { state: authState } = useAuth();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {authState.status === 'initializing' ? (
            <Stack.Screen name="Splash" component={Splash} />
          ) : authState.status === 'error' ||
            authState.status === 'validating' ? (
            <Stack.Screen name="Login" component={Login} />
          ) : (
            <>
              {/* <Stack.Screen name="AppLoading" component={AppLoading}></Stack.Screen> */}
              <Stack.Screen name="Home" component={Home} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider initialTheme={theme}>
          <AppWithAuthContext />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};
