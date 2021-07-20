import React from 'react';
import { Text, View } from 'react-native';
import { TeamSummaryView } from '@dev-adsoftware/fourdownsfootball-dtos';

import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

import { useTheme } from '../../providers/theme';

type TabParamList = {
  Scores: { team: TeamSummaryView };
};
type ScreenRouteProp = RouteProp<TabParamList, 'Scores'>;
type ScreenNavigationProp = MaterialTopTabNavigationProp<
  TabParamList,
  'Scores'
>;

type Props = {
  route: ScreenRouteProp;
  navigation: ScreenNavigationProp;
};

export default ({ route }: Props) => {
  const theme = useTheme();
  console.log('in depth chart');
  console.log(route.params.team);
  return (
    <>
      <View style={theme.layout.container}>
        <Text>roster</Text>
      </View>
    </>
  );
};
