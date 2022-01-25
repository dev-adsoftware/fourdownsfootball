import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Color,
  ColorSelectInput,
} from '../../components/teams/select-color-input';
import {CreateTeamStackParamList} from '../../stacks/teams-tab/create';

type Properties = {
  route: RouteProp<CreateTeamStackParamList, 'Select Primary Color'>;
  navigation: NativeStackNavigationProp<CreateTeamStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  return (
    <ColorSelectInput
      selectedColor={route.params.selectedColor}
      onPressOption={(color: Color) => {
        navigation.navigate({
          name: 'Create Team',
          params: {primaryColor: color},
          merge: true,
        });
      }}
    />
  );
};

export {Component as SelectPrimaryColorScreen};
