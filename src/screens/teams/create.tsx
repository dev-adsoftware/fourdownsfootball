import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {CreateTeamStepper} from '../../components/teams/create-stepper';
import {Nation} from '../../services/nations';
import {CreateTeamStackParamList} from '../../stacks/teams-tab/create';

type Properties = {
  route: RouteProp<CreateTeamStackParamList, 'Create Team'>;
  navigation: NativeStackNavigationProp<CreateTeamStackParamList>;
};

const CreateTeamsScreen: React.FC<Properties> = ({route, navigation}) => {
  return (
    <CreateTeamStepper
      nation={route.params?.nation}
      onPressSelectNation={(selectedNation?: Nation) => {
        navigation.navigate('Select Nation', {selectedNation});
      }}
    />
  );
};

export {CreateTeamsScreen};
