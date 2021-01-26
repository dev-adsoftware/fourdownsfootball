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
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';

import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:caf1a4d0-89c7-4709-b014-c73a815b417b',

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    userPoolId: 'us-east-1_BPfA6yVGe',

    userPoolWebClientId: '7p57v7b3li65ccvp3pkv8vqon6',
  },
  Analytics: {
    disabled: true,
  },
});

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

const App = () => {
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

export default withAuthenticator(App);
