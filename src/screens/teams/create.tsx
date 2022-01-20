import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {CreateTeamStepper} from '../../components/teams/create-stepper';
import {Nation} from '../../services/nations';
import {State} from '../../services/states';
import {CreateTeamStackParamList} from '../../stacks/teams-tab/create';

type Properties = {
  route: RouteProp<CreateTeamStackParamList, 'Create Team'>;
  navigation: NativeStackNavigationProp<CreateTeamStackParamList>;
};

const CreateTeamsScreen: React.FC<Properties> = ({route, navigation}) => {
  console.log(route.params);

  return (
    <CreateTeamStepper
      nation={route.params?.nation}
      state={route.params?.state}
      onPressSelectNation={(selectedNation?: Nation) => {
        navigation.navigate('Select Nation', {selectedNation});
      }}
      onPressSelectState={(nationId: string, selectedState?: State) => {
        navigation.navigate('Select State', {nationId, selectedState});
      }}
    />
  );
};

export {CreateTeamsScreen};
