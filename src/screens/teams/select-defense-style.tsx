import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {DefenseStyleSelectInput} from '../../components/teams/select-defense-style-input';
import {CreateTeamStackParamList} from '../../stacks/teams-tab/create';

type Properties = {
  route: RouteProp<CreateTeamStackParamList, 'Select Defense Style'>;
  navigation: NativeStackNavigationProp<CreateTeamStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  return (
    <DefenseStyleSelectInput
      selectedStyle={route.params.selectedStyle}
      onPressOption={(defenseStyle: string) => {
        navigation.navigate({
          name: 'Create Team',
          params: {defenseStyle},
          merge: true,
        });
      }}
    />
  );
};

export {Component as SelectDefenseStyleScreen};
