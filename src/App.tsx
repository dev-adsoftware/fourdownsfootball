// import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from './providers/theme';
import { EnvProvider } from './providers/env';
import theme from './theme.json';
import env from './env.json';
// @ts-ignore
// import { Authenticator } from 'aws-amplify-react-native';

import Amplify from 'aws-amplify';
import { AuthProvider } from './providers/auth';
import Home from './screens/home';

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

// const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <EnvProvider initialEnv={env}>
        <ThemeProvider initialTheme={theme}>
          <PaperProvider>
            <React.Fragment>
              {Platform.OS === 'web' ? (
                <style type="text/css">{`
                  @font-face {
                    font-family: 'MaterialCommunityIcons';
                    src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
                  }
                `}</style>
              ) : null}
              <AuthProvider>
                <Home />
              </AuthProvider>
            </React.Fragment>
          </PaperProvider>
        </ThemeProvider>
      </EnvProvider>
    </>
  );
};

export default App;
