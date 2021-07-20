import React from 'react';
import { TeamSummaryView } from '@dev-adsoftware/fourdownsfootball-dtos';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TeamScores from './scores';
import TeamRoster from './roster';
import TeamDepthChart from './depth-chart';

type StackParamList = {
  Detail: { team: TeamSummaryView };
};
type ScreenRouteProp = RouteProp<StackParamList, 'Detail'>;
type ScreenNavigationProp = StackNavigationProp<StackParamList, 'Detail'>;
type Props = {
  route: ScreenRouteProp;
  navigation: ScreenNavigationProp;
};

type TabParamList = {
  Scores: { team: TeamSummaryView };
  Roster: { team: TeamSummaryView };
  DepthChart: { team: TeamSummaryView };
};
const Tab = createMaterialTopTabNavigator<TabParamList>();

export default ({ route }: Props) => {
  console.log('in detail');
  console.log(route.params.team);
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Scores"
          component={TeamScores}
          initialParams={{ team: route.params.team }}
        />
        <Tab.Screen
          name="Roster"
          component={TeamRoster}
          initialParams={{ team: route.params.team }}
        />
        <Tab.Screen
          name="DepthChart"
          component={TeamDepthChart}
          initialParams={{ team: route.params.team }}
        />
      </Tab.Navigator>
    </>
  );
};
