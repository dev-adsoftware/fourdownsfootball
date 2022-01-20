import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TeamsList} from '../../components/teams/list';
import {NewToolbar} from '../../components/toolbars/new';
import {TeamsStackParamList} from '../../stacks/teams-tab/teams';

type Properties = {
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamsScreen: React.FC<Properties> = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <NewToolbar onNew={() => navigation.navigate('Create Team Stack')} />
        );
      },
    });
  }, [navigation]);

  return (
    <TeamsList
      onPressTeam={(teamId: string) => {
        navigation.navigate('Team Detail', {teamId});
      }}
      onPressCreateTeam={() => {
        navigation.navigate('Create Team Stack');
      }}
    />
  );
};

export {TeamsScreen};
