import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {OffenseStyleSelectInput} from '../../components/teams/select-offense-style-input';
import {CreateTeamStackParamList} from '../../stacks/teams-tab/create';

type Properties = {
  route: RouteProp<CreateTeamStackParamList, 'Select Offense Style'>;
  navigation: NativeStackNavigationProp<CreateTeamStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  return (
    <OffenseStyleSelectInput
      selectedStyle={route.params.selectedStyle}
      onPressOption={(offenseStyle: string) => {
        navigation.navigate({
          name: 'Create Team',
          params: {offenseStyle},
          merge: true,
        });
      }}
    />
  );
};

export {Component as SelectOffenseStyleScreen};
