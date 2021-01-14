import React from 'react';
import { View, Text } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
// import { LoginScreenProps } from '../Login';
// import { AppLoadingScreenProps } from '../AppLoading';
import { useAuth } from '../../Providers/AuthProvider';
import { useTheme } from '../../Providers/ThemeProvider';

// export interface SplashScreenProps { }

// export default ({ navigation, route }: StackScreenProps<{
export default () => {
  const { init: authInit } = useAuth();
  const theme = useTheme();

  React.useEffect(() => {
    async function init() {
      await authInit();
    }
    setTimeout(() => {
      init();
    }, 2000);
  }, [authInit]);

  return (
    <View>
      <Text style={{ ...theme.typography.heading1 }}>Splash!</Text>
    </View>
  );
};
