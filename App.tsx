/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {Amplify} from 'aws-amplify';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import env from './env.json';
import {AuthProvider, useAuth} from './src/providers/auth';
import {DataProvider} from './src/providers/data';
import {EnvProvider} from './src/providers/env';
import {ThemeProvider, useTheme} from './src/providers/theme';
import {SplashScreen} from './src/screens/splash';
import {AuthStack} from './src/stacks/auth';
import {MainTabStack} from './src/stacks/main-tab';
import {NotificationProvider} from './src/providers/notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';

Amplify.configure({
  Auth: {
    region: env.region,
    userPoolId: env.userPoolId,
    userPoolWebClientId: env.userPoolWebClientId,
  },
  Analytics: {
    disabled: true,
  },
});

const Main = () => {
  const auth = useAuth();
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return auth.isLoading ? (
    <SplashScreen />
  ) : (
    <NotificationProvider>
      <DataProvider>
        {!auth.isAuthenticated ? (
          <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
            <AuthStack />
          </NavigationContainer>
        ) : (
          <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
            <MainTabStack />
          </NavigationContainer>
        )}
      </DataProvider>
    </NotificationProvider>
  );
};

const App = () => {
  return (
    <EnvProvider initialEnv={env}>
      <ThemeProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <Main />
          </SafeAreaProvider>
        </AuthProvider>
      </ThemeProvider>
    </EnvProvider>
  );
};

export default App;
