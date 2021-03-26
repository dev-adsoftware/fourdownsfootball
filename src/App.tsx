// import 'react-native-gesture-handler';
import React from 'react';
import Amplify from '@aws-amplify/core';

// UI Components and themes
import { Provider as PaperProvider } from 'react-native-paper';

// Providers
import { EnvProvider } from './providers/env';
import { Theme, ThemeProvider } from './providers/theme';
import { AuthProvider } from './providers/auth';
import { NotificationProvider } from './providers/notification';

// Helpers
import { init as IconInit } from './helpers/icons';

// Environment
import env from './env.json';

// Screens
import HomeMain from './screens/home/main';

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
      },
    ],
  },
});

const theme = new Theme();

const App = () => {
  IconInit();

  return (
    <>
      <EnvProvider initialEnv={env}>
        <ThemeProvider initialTheme={theme}>
          <PaperProvider theme={theme.mapToPaper()}>
            <AuthProvider>
              <NotificationProvider>
                <HomeMain />
              </NotificationProvider>
            </AuthProvider>
          </PaperProvider>
        </ThemeProvider>
      </EnvProvider>
    </>
  );
};

export default App;
