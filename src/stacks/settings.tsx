import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamList} from '../../App';
import {DismissToolbar} from '../components/toolbars/dismiss';
import {useTheme} from '../providers/theme';
import {SettingsScreen} from '../screens/settings';
import {SignOutConfirmationScreen} from '../screens/auth/sign-out-confirmation';

export type SettingsStackParamList = {
  'Settings List': undefined;
  'Sign Out': undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

type Properties = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

const SettingsStack: React.FC<Properties> = ({navigation}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.link,
        headerTitleStyle: {color: theme.colors.text},
      }}>
      <Stack.Screen
        name="Settings List"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerRight: () => {
            return <DismissToolbar onDismiss={() => navigation.goBack()} />;
          },
        }}
      />
      <Stack.Screen name="Sign Out" component={SignOutConfirmationScreen} />
    </Stack.Navigator>
  );
};

export {SettingsStack};
