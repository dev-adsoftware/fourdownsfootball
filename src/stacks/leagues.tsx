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

export type LeaguesStackParamList = {
  Leagues: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<LeaguesStackParamList>();

const LeaguesStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.black},
        headerTintColor: theme.colors.white,
        headerBackTitleVisible: false,
        contentStyle: {backgroundColor: theme.colors.secondaryBackground},
      }}>
      <Stack.Screen name="Leagues" component={TempScreen} />
    </Stack.Navigator>
  );
};

export {LeaguesStack};
