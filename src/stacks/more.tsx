import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamList} from '../../App';
import {useTheme} from '../providers/theme';
import {SignOutConfirmationScreen} from '../screens/auth/sign-out-confirmation';
import {MoreMainScreen} from '../screens/more/main';

type Properties = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

export type MoreStackParamList = {
  More: undefined;
  'Sign Out': undefined;
};

const Stack = createNativeStackNavigator<MoreStackParamList>();

const MoreStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="More" component={MoreMainScreen} />
      <Stack.Screen name="Sign Out" component={SignOutConfirmationScreen} />
    </Stack.Navigator>
  );
};

export {MoreStack};
