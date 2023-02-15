import {Amplify} from 'aws-amplify';
import React from 'react';
import env from './env.json';
import {AuthProvider} from './src/providers/auth';
import {DataProvider} from './src/providers/data';
import {EnvProvider} from './src/providers/env';
import {ThemeProvider} from './src/providers/theme';
import {SplashScreen} from './src/screens/splash';
import {MainScreen} from './src/screens/main';
import {NotificationProvider} from './src/providers/notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {OnboardingStack} from './src/stacks/onboarding';
import {
  AppState,
  GlobalStateProvider,
  useGlobalState,
} from './src/providers/global-state';
import {AuthStack} from './src/screens/auth-stack';
import {OnboardingStack} from './src/screens/onboarding-stack';
import {FadeInScreenProvider} from './src/components/navigation/fade-in-screen';
import LayoutScreen from './src/screens/layout';

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

  switch (globalState.appState.value) {
    case AppState.LOADING:
      return <SplashScreen />;
    case AppState.UNAUTHENTICATED:
      return <AuthStack />;
    case AppState.AUTHENTICATED:
      return <SplashScreen />;
    case AppState.ONBOARDING:
      return <OnboardingStack />;
    // return (
    //   <NavigationContainer theme={theme.mapToNavigation(colorScheme)}>
    //     <OnboardingStack />
    //   </NavigationContainer>
    // );
    default:
      return <MainScreen />;
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
                  <FadeInScreenProvider>
                    <Main />
                    {/* <LayoutScreen /> */}
                  </FadeInScreenProvider>
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
