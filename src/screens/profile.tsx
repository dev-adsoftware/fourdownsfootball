import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ProfileOptionsList} from '../components/profile-options-list';
import {ProfileStackParamList} from '../stacks/profile';

type Properties = {
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
};

const ProfileScreen: React.FC<Properties> = ({navigation}) => {
  return (
    <ProfileOptionsList
      onPressProfileOption={(option: string) => {
        navigation.navigate(option as keyof ProfileStackParamList);
      }}
    />
  );
};

export {ProfileScreen};
