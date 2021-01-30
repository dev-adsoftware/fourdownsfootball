// import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';
import { EnvProvider } from './providers/env';
import env from './env.json';

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
  console.log(Platform.OS);
  return (
    <>
      <EnvProvider initialEnv={env}>
        <PaperProvider theme={theme}>
          {/* <React.Fragment> */}
          {/* {Platform.OS === 'web' ? (
              <style type="text/css">{`
                  @font-face {
                    font-family: 'MaterialCommunityIcons';
                    src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
                  }
                `}</style>
            ) : null} */}
          <AuthProvider>
            <Home />
          </AuthProvider>
          {/* </React.Fragment> */}
        </PaperProvider>
      </EnvProvider>
    </>
  );
};

export default App;
