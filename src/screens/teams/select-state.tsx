import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StateSelectInput} from '../../components/teams/state-select-input';
import {State} from '../../services/states';
import {CreateTeamStackParamList} from '../../stacks/teams-tab/create';

type Properties = {
  route: RouteProp<CreateTeamStackParamList, 'Select State'>;
  navigation: NativeStackNavigationProp<CreateTeamStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  return (
    <StateSelectInput
      nationId={route.params.nationId}
      selectedState={route.params.selectedState}
      onPressOption={(state: State) => {
        navigation.navigate({
          name: 'Create Team',
          params: {state},
          merge: true,
        });
      }}
    />
  );
};

export {Component as SelectStateScreen};
