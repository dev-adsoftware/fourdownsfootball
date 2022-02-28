import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import uuid from 'react-native-uuid';
import {TeamRequestForm} from '../../components/teams/team-request-form';
import {useAuth} from '../../providers/auth';
import {useData} from '../../providers/data';
import {TeamRequestsService} from '../../services/team-requests';
import {Town} from '../../services/towns';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Team Request'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamRequestScreen: React.FC<Properties> = ({route, navigation}) => {
  const {teams} = useData();
  const auth = useAuth();

  return (
    <TeamRequestForm
      nation={route.params?.nation}
      state={route.params?.state}
      town={route.params?.town}
      onSubmit={async (town: Town, nickname: string) => {
        await new TeamRequestsService().create({
          id: uuid.v4() as string,
          ownerId: auth.owner?.id as string,
          townId: town.id,
          town: town as Town,
          nickname: nickname,
          primaryColor: 'Green',
          teamEmphasis: 'Balanced',
          offenseStyle: 'Balanced',
          defenseStyle: 'Balanced',
        });
        await teams.refresh();
      }}
      navigation={navigation}
    />
  );
};

export {TeamRequestScreen};
