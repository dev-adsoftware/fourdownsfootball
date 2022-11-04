import React from 'react';
import {useTheme} from '../providers/theme';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TempScreen} from '../screens/temp';
import {TeamRosterScreen} from '../screens/teams/roster';

export type TeamDetailTabParamList = {
  scores: undefined;
  standings: undefined;
  stats: undefined;
  roster: {teamId: string};
  news: undefined;
};

const Tab = createMaterialTopTabNavigator<TeamDetailTabParamList>();

type Properties = {
  backgroundColor: string;
};

const TeamDetailTabStack: React.FC<Properties> = ({backgroundColor}) => {
  const theme = useTheme();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarContentContainerStyle: {
            margin: 0,
          },
          tabBarItemStyle: {
            width: 'auto',
            padding: 0,
            paddingHorizontal: 10,
            margin: 0,
            minHeight: 36,
          },
          tabBarLabelStyle: {
            letterSpacing: 0.5,
          },
          tabBarIndicatorStyle: {
            backgroundColor: (theme.colors as {[x: string]: string})[
              backgroundColor.toLowerCase()
            ],
          },
        }}>
        <Tab.Screen name="scores" component={TempScreen} />
        <Tab.Screen name="standings" component={TempScreen} />
        <Tab.Screen name="stats" component={TempScreen} />
        <Tab.Screen name="roster" component={TeamRosterScreen} />
        <Tab.Screen name="news" component={TempScreen} />
      </Tab.Navigator>
    </>
  );
};

export {TeamDetailTabStack};
