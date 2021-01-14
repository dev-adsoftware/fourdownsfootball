import React from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeScreenProps } from '../Home';

export interface AppLoadingScreenProps { }

export default ({ navigation, route }: StackScreenProps<{
  AppLoading: AppLoadingScreenProps, Home: HomeScreenProps
}, 'AppLoading'>) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home', {});
    }, 2000);
  }, []);

  return (
    <View>
      <Text>Appication Loading ...</Text>
    </View>
  );
};
