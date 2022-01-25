import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TownSelectInput} from '../../components/teams/select-town-input';
import {Town} from '../../services/towns';
import {CreateTeamStackParamList} from '../../stacks/teams-tab/create';

type Properties = {
  route: RouteProp<CreateTeamStackParamList, 'Select Town'>;
  navigation: NativeStackNavigationProp<CreateTeamStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  return (
    <TownSelectInput
      stateId={route.params.stateId}
      selectedTown={route.params.selectedTown}
      onPressOption={(town: Town) => {
        navigation.navigate({
          name: 'Create Team',
          params: {town},
          merge: true,
        });
      }}
    />
  );
};

export {Component as SelectTownScreen};
