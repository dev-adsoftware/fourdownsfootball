import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SettingsOptionsList} from '../components/settings/settings-options-list';
import {SettingsStackParamList} from '../stacks/settings';

type Properties = {
  navigation: NativeStackNavigationProp<SettingsStackParamList>;
};

const SettingsScreen: React.FC<Properties> = ({navigation}) => {
  return (
    <SettingsOptionsList
      onPressSettingsOption={(option: string) => {
        navigation.navigate(option as keyof SettingsStackParamList);
      }}
    />
  );
};

export {SettingsScreen};
