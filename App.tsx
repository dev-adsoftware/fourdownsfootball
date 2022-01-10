/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import Amplify from 'aws-amplify';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider, useAuth} from './src/providers/auth';
import {EnvProvider} from './src/providers/env';
import {Theme, ThemeProvider, useTheme} from './src/providers/theme';
import env from './env.json';
import {SplashScreen} from './src/screens/splash';
import {MainTabStack} from './src/stacks/main-tab';
import {AuthStack} from './src/stacks/auth';
import {DataProvider} from './src/providers/data';

Amplify.configure({
  Auth: {
    identityPoolId: env.identityPoolId,
    region: env.region,
    userPoolId: env.userPoolId,
    userPoolWebClientId: env.userPoolWebClientId,
  },
  Analytics: {
    disabled: true,
  },
  API: {
    endpoints: [
      {
        name: 'fourdowns',
        endpoint: env.apiEndpoint,
        region: 'us-east-1',
      },
    ],
  },
});

const Main = () => {
  const auth = useAuth();
  const theme = useTheme();

  return auth.isLoading ? (
    <SplashScreen />
  ) : (
    <DataProvider>
      <NavigationContainer theme={theme.mapToNavigation()}>
        {!auth.isAuthenticated ? <AuthStack /> : <MainTabStack />}
      </NavigationContainer>
    </DataProvider>
  );
};

const App = () => {
  const theme = new Theme();

  return (
    <EnvProvider initialEnv={env}>
      <ThemeProvider initialTheme={theme}>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </ThemeProvider>
    </EnvProvider>
  );
};

export default App;
