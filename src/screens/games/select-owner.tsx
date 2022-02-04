import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {OwnerSelectInput} from '../../components/games/owner-select-input';
import {Owner} from '../../services/owners';
import {RequestGameStackParamList} from '../../stacks/games-tab/request';

type Properties = {
  route: RouteProp<RequestGameStackParamList, 'Select Owner'>;
  navigation: NativeStackNavigationProp<RequestGameStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  return (
    <OwnerSelectInput
      selectedOwner={route.params.selectedOwner}
      onPressOption={(owner: Owner) => {
        navigation.navigate({
          name: 'Request Game',
          params: {owner},
          merge: true,
        });
      }}
    />
  );
};

export {Component as SelectOwnerScreen};
