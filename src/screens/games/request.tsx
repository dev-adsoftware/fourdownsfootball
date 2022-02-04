import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {GameRequestForm} from '../../components/games/request-form';
// import {Owner} from '../../services/owners';
// import {Team} from '../../services/teams';
import {RequestGameStackParamList} from '../../stacks/games-tab/request';

type Properties = {
  route: RouteProp<RequestGameStackParamList, 'Request Game'>;
  navigation: NativeStackNavigationProp<RequestGameStackParamList>;
};

const GameRequestScreen: React.FC<Properties> = ({route, navigation}) => {
  return (
    <GameRequestForm
      team={route.params?.team}
      owner={route.params?.owner}
      navigation={navigation}
      // onPressSelectTeam={(selectedTeam?: Team) => {
      //   navigation.navigate('Select Team', {selectedTeam});
      // }}
      // onPressSelectOwner={(selectedOwner?: Owner) => {
      //   navigation.navigate('Select Owner', {selectedOwner});
      // }}
      // onDismiss={() => {
      //   navigation.goBack();
      // }}
    />
  );
};

export {GameRequestScreen};
