import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TeamRequestForm} from '../../components/teams/team-request-form';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Team Request'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamRequestScreen: React.FC<Properties> = ({route, navigation}) => {
  return (
    <TeamRequestForm
      nation={route.params?.nation}
      state={route.params?.state}
      town={route.params?.town}
      navigation={navigation}
    />
  );
};

export {TeamRequestScreen};
