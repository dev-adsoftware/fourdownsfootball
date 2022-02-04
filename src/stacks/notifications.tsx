import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamList} from '../../App';
import {useTheme} from '../providers/theme';
import {TempScreen} from '../screens/temp';

type Properties = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

export type NotificationsStackParamList = {
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<NotificationsStackParamList>();

const NotificationsStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Notifications" component={TempScreen} />
    </Stack.Navigator>
  );
};

export {NotificationsStack};
