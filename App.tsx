import Amplify from 'aws-amplify';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider, useAuth} from './src/providers/auth';
import {EnvProvider} from './src/providers/env';
import {ThemeProvider, useTheme} from './src/providers/theme';
import env from './env.json';
import {SplashScreen} from './src/screens/splash';
import {MainTabStack} from './src/stacks/main-tab';
import {AuthStack} from './src/stacks/auth';
import {DataProvider} from './src/providers/data';
import {useColorScheme} from 'react-native';
import {NotificationProvider} from './src/providers/notification';

Amplify.configure({
  Auth: {
    identityPoolId: env.identityPoolId,
    region: env.region,
    userPoolId: env.userPoolId,
    userPoolWebClientId: env.userPoolWebClientId,
    // identityPoolId: 'us-east-1:33a998b7-ee02-4f75-8757-0e7a67616af5',
    // region: 'us-east-1',
    // userPoolId: 'us-east-1_lineDXFgS',
    // userPoolWebClientId: '34bq4v1p2vudp38sl2aaddoo0r',
  },
  Analytics: {
    disabled: true,
  },
  API: {
    endpoints: [
      {
        name: 'fourdowns',
        endpoint: env.apiEndpoint,
        // endpoint: 'https://t5ljb7mxlf.execute-api.us-east-1.amazonaws.com',
        region: 'us-east-1',
      },
    ],
  },
});

export type AppStackParamList = {
  MainTabs: undefined;
  Settings: undefined;
};

const Main = () => {
  const auth = useAuth();
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return auth.isLoading ? (
    <SplashScreen />
  ) : (
    <DataProvider>
      <NotificationProvider>
        {!auth.isAuthenticated ? (
          <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
            <AuthStack />
          </NavigationContainer>
        ) : (
          <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
            <MainTabStack />
          </NavigationContainer>
        )}
      </NotificationProvider>
    </DataProvider>
  );
};

const App = () => {
  return (
    <EnvProvider initialEnv={env}>
      <ThemeProvider>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </ThemeProvider>
    </EnvProvider>
  );
};

export default App;
