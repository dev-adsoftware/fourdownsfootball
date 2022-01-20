import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {NationSelectInput} from '../../components/teams/nation-select-input';
import {Nation} from '../../services/nations';
import {CreateTeamStackParamList} from '../../stacks/teams-tab/create';

type Properties = {
  route: RouteProp<CreateTeamStackParamList, 'Select Nation'>;
  navigation: NativeStackNavigationProp<CreateTeamStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  return (
    <NationSelectInput
      selectedNation={route.params.selectedNation}
      onPressOption={(nation: Nation) => {
        navigation.navigate('Create Team', {nation});
      }}
    />
  );
};

export {Component as SelectNationScreen};
