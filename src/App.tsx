// import 'react-native-gesture-handler';
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './Providers/ThemeProvider';
import { EnvProvider } from './Providers/EnvProvider';
// import Home from './Screens/Home';
import theme from './theme.json';
import env from './env.json';
// @ts-ignore
// import { Authenticator } from 'aws-amplify-react-native';

import Amplify from 'aws-amplify';
import { AuthProvider } from './Providers/AuthProvider';
import Home from './Screens/Home';

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
          <AuthProvider>
            <Home />
            {/* <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
              </Stack.Navigator>
            </NavigationContainer> */}
          </AuthProvider>
        </ThemeProvider>
      </EnvProvider>
    </>
  );
};

export default App;
