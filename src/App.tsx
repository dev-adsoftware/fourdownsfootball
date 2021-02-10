// import 'react-native-gesture-handler';
import React from 'react';
import Amplify from 'aws-amplify';

// UI Components and themes
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';

// Providers
import { EnvProvider } from './providers/env';
import { AuthProvider } from './providers/auth';

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

const App = () => {
  IconInit();

  return (
    <>
      <EnvProvider initialEnv={env}>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <HomeMain />
          </AuthProvider>
        </PaperProvider>
      </EnvProvider>
    </>
  );
};

export default App;
