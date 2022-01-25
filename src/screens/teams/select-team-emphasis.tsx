import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TeamEmphasisSelectInput} from '../../components/teams/select-team-emphasis-input';
import {CreateTeamStackParamList} from '../../stacks/teams-tab/create';

type Properties = {
  route: RouteProp<CreateTeamStackParamList, 'Select Team Emphasis'>;
  navigation: NativeStackNavigationProp<CreateTeamStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  return (
    <TeamEmphasisSelectInput
      selectedEmphasis={route.params.selectedEmphasis}
      onPressOption={(teamEmphasis: string) => {
        navigation.navigate({
          name: 'Create Team',
          params: {teamEmphasis},
          merge: true,
        });
      }}
    />
  );
};

export {Component as SelectTeamEmphasisScreen};
