import React from 'react';
import { View, Text } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
// import { LoginScreenProps } from '../Login';
// import { AppLoadingScreenProps } from '../AppLoading';
import { useAuth } from '../../Providers/AuthProvider';
import { useTheme } from '../../Providers/ThemeProvider';
import { useEnv } from '../../Providers/EnvProvider';

// export interface SplashScreenProps { }

// export default ({ navigation, route }: StackScreenProps<{
export default () => {
  const { init: authInit } = useAuth();
  const theme = useTheme();
  const { environment } = useEnv();

  const [isSplashing, setIsSplashing] = React.useState(false);

  React.useEffect(() => {
    if (!isSplashing) {
      setIsSplashing(true);
      setTimeout(async () => {
        console.log('in splash timeout');
        await authInit();
      }, 2000);
    }
  }, [authInit, isSplashing]);

  return (
    <View>
      <Text style={{ color: theme.colors.secondary }}>
        Splash! {environment}
      </Text>
    </View>
  );
};
