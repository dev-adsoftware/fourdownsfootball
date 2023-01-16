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
import {DataProvider} from './src/providers/data';
import {EnvProvider} from './src/providers/env';
import {ThemeProvider, useTheme} from './src/providers/theme';
import {SplashScreen} from './src/screens/splash';
import {AuthStack} from './src/stacks/auth';
import {MainScreen} from './src/screens/main';
import {NotificationProvider} from './src/providers/notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {OnboardingStack} from './src/stacks/onboarding';
import {
  AppState,
  GlobalStateProvider,
  useGlobalState,
} from './src/providers/global-state';

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
  const globalState = useGlobalState();
  const colorScheme = useColorScheme();
  const theme = useTheme();

  switch (globalState.appState.get()) {
    case AppState.LOADING:
      return <SplashScreen />;
    case AppState.UNAUTHENTICATED:
      return (
        <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
          <AuthStack />
        </NavigationContainer>
      );
    case AppState.AUTHENTICATED:
      return <SplashScreen />;
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
          <MainScreen />
        </NavigationContainer>
      );
  }
};

const App = () => {
  return (
    <EnvProvider initialEnv={env}>
      <ThemeProvider>
        <GlobalStateProvider>
          <AuthProvider>
            <NotificationProvider>
              <DataProvider>
                <SafeAreaProvider>
                  <Main />
                </SafeAreaProvider>
              </DataProvider>
            </NotificationProvider>
          </AuthProvider>
        </GlobalStateProvider>
      </ThemeProvider>
    </EnvProvider>
  );
};

export default App;
