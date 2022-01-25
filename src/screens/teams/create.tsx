import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {CreateTeamStepper} from '../../components/teams/create-stepper';
import {Color} from '../../components/teams/select-color-input';
import {Nation} from '../../services/nations';
import {State} from '../../services/states';
import {Town} from '../../services/towns';
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
      town={route.params?.town}
      primaryColor={route.params?.primaryColor}
      secondaryColor={route.params?.secondaryColor}
      stripeColor={route.params?.stripeColor}
      teamEmphasis={route.params?.teamEmphasis}
      offenseStyle={route.params?.offenseStyle}
      defenseStyle={route.params?.defenseStyle}
      onPressSelectNation={(selectedNation?: Nation) => {
        navigation.navigate('Select Nation', {selectedNation});
      }}
      onPressSelectState={(nationId: string, selectedState?: State) => {
        navigation.navigate('Select State', {nationId, selectedState});
      }}
      onPressSelectTown={(stateId: string, selectedTown?: Town) => {
        navigation.navigate('Select Town', {stateId, selectedTown});
      }}
      onPressSelectPrimaryColor={(selectedColor?: Color) => {
        navigation.navigate('Select Primary Color', {selectedColor});
      }}
      onPressSelectSecondaryColor={(selectedColor?: Color) => {
        navigation.navigate('Select Secondary Color', {selectedColor});
      }}
      onPressSelectStripeColor={(selectedColor?: Color) => {
        navigation.navigate('Select Stripe Color', {selectedColor});
      }}
      onPressSelectTeamEmphasis={(selectedEmphasis?: string) => {
        navigation.navigate('Select Team Emphasis', {selectedEmphasis});
      }}
      onPressSelectOffenseStyle={(selectedStyle?: string) => {
        navigation.navigate('Select Offense Style', {selectedStyle});
      }}
      onPressSelectDefenseStyle={(selectedStyle?: string) => {
        navigation.navigate('Select Defense Style', {selectedStyle});
      }}
    />
  );
};

export {CreateTeamsScreen};
