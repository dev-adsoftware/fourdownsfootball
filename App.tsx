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

// import OneSignal from 'react-native-onesignal';

// // OneSignal Initialization
// OneSignal.setAppId('9e051574-ebf4-4f71-93e2-1218b7739d5d');

// // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
// OneSignal.promptForPushNotificationsWithUserResponse();

// //Method for handling notifications received while app in foreground
// OneSignal.setNotificationWillShowInForegroundHandler(
//   notificationReceivedEvent => {
//     console.log(
//       'OneSignal: notification will show in foreground:',
//       notificationReceivedEvent,
//     );
//     let notification = notificationReceivedEvent.getNotification();
//     console.log('notification: ', notification);
//     const data = notification.additionalData;
//     console.log('additionalData: ', data);
//     // Complete with null means don't show a notification.
//     notificationReceivedEvent.complete();
//   },
// );

// //Method for handling notifications opened
// OneSignal.setNotificationOpenedHandler(notification => {
//   console.log('OneSignal: notification opened:', notification);
// });

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
