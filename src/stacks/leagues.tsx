import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamList} from '../../App';
import {SettingsToolbar} from '../components/toolbars/settings';
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

const LeaguesStack: React.FC<Properties> = ({navigation}) => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
        headerRight: () => {
          return (
            <SettingsToolbar
              onPressCog={() => navigation.navigate('Settings')}
            />
          );
        },
      }}>
      <Stack.Screen name="Leagues" component={TempScreen} />
    </Stack.Navigator>
  );
};

export {LeaguesStack};
