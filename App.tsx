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
import {AuthProvider} from './src/providers/auth';
import {AppState, DataProvider, useData} from './src/providers/data';
import {EnvProvider} from './src/providers/env';
import {ThemeProvider, useTheme} from './src/providers/theme';
import {SplashScreen} from './src/screens/splash';
import {AuthStack} from './src/stacks/auth';
import {MainTabStack} from './src/stacks/main-tab';
import {NotificationProvider} from './src/providers/notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OnboardingStack} from './src/stacks/onboarding';

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
  const data = useData();
  const colorScheme = useColorScheme();
  const theme = useTheme();

  switch (data.appState) {
    case AppState.LOADING:
      return <SplashScreen />;
    case AppState.UNAUTHENTICATED:
      return (
        <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
          <AuthStack />
        </NavigationContainer>
      );
    case AppState.ONBOARDING:
      return <SplashScreen />;
    // return (
    //   <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
    //     <OnboardingStack />
    //   </NavigationContainer>
    // );
    default:
      return (
        <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
          <MainTabStack />
        </NavigationContainer>
      );
  }
};

const App = () => {
  return (
    <EnvProvider initialEnv={env}>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <DataProvider>
              <SafeAreaProvider>
                <Main />
              </SafeAreaProvider>
            </DataProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </EnvProvider>
  );
};

export default App;
