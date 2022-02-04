import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TeamsStackParamList} from '../../stacks/teams';
import {TeamsRosterList} from '../../components/teams/roster';
import {Player} from '../../services/players';
import {RouteProp} from '@react-navigation/native';
import {TeamDetailTabParamList} from '../../stacks/team-detail';

type Properties = {
  route: RouteProp<TeamDetailTabParamList, 'roster'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamRosterScreen: React.FC<Properties> = ({route, navigation}) => {
  return (
    <TeamsRosterList
      teamId={route.params.teamId}
      onPressPlayer={(player: Player) => {
        navigation.navigate('Team Player Detail', {player});
      }}
    />
  );
};

export {TeamRosterScreen};
