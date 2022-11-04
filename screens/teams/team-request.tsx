import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import uuid from 'react-native-uuid';
import {TeamRequestForm} from '../../components/teams/team-request-form';
import {useData} from '../../providers/data';
import {TeamRequestDto, TownDto} from '../../services/dtos';
import {TeamRequestsService} from '../../services/team-requests';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Team Request'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamRequestScreen: React.FC<Properties> = ({route, navigation}) => {
  const {ownerDashboard} = useData();

  return (
    <TeamRequestForm
      nation={route.params?.nation}
      state={route.params?.state}
      town={route.params?.town}
      onSubmit={async (town: TownDto, nickname: string) => {
        const teamRequest = new TeamRequestDto();
        teamRequest.id = uuid.v4() as string;
        teamRequest.ownerId = ownerDashboard.item?.owner.id as string;
        teamRequest.townId = town.id;
        teamRequest.nickname = nickname;
        teamRequest.primaryColor = 'Green';
        teamRequest.teamEmphasis = 'Balanced';
        teamRequest.offenseStyle = 'Balanced';
        teamRequest.defenseStyle = 'Balanced';
        await new TeamRequestsService().createTeamRequest(teamRequest);
        await ownerDashboard.refresh();
        navigation.goBack();
      }}
      navigation={navigation}
    />
  );
};

export {TeamRequestScreen};
