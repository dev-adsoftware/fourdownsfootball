import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TeamSelectInput} from '../../components/games/team-select-input';
import {Team} from '../../services/teams';
import {RequestGameStackParamList} from '../../stacks/games-tab/request';

type Properties = {
  route: RouteProp<RequestGameStackParamList, 'Select Team'>;
  navigation: NativeStackNavigationProp<RequestGameStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  return (
    <TeamSelectInput
      selectedTeam={route.params?.selectedTeam}
      onPressOption={(team: Team) => {
        navigation.navigate({
          name: 'Request Game',
          params: {team},
          merge: true,
        });
      }}
    />
  );
};

export {Component as SelectTeamScreen};
