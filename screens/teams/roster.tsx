import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TeamsStackParamList} from '../../stacks/teams';
import {TeamsRosterList} from '../../components/teams/roster';
import {useData} from '../../providers/data';

type Properties = {
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamRosterScreen: React.FC<Properties> = ({navigation}) => {
  const {activeTeam} = useData();

  return (
    <TeamsRosterList
      players={activeTeam.item?.players || []}
      isLoading={activeTeam.isLoading}
      onRefresh={activeTeam.refresh}
      navigation={navigation}
    />
  );
};

export {TeamRosterScreen};
