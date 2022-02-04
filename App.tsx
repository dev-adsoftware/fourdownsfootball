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
      <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
        {!auth.isAuthenticated ? <AuthStack /> : <MainTabStack />}
      </NavigationContainer>
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
