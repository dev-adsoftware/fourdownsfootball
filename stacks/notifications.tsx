import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamList} from '../../App';
import {useTheme} from '../providers/theme';
import {NotificationsScreen} from '../screens/notifications/notifications';

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
        headerStyle: {backgroundColor: theme.colors.black},
        headerTintColor: theme.colors.white,
        headerBackTitleVisible: false,
        contentStyle: {backgroundColor: theme.colors.secondaryBackground},
      }}>
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export {NotificationsStack};
