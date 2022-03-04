import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from '../providers/theme';
import {TeamsStackParamList} from './teams';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TempScreen} from '../screens/temp';
import {TeamRosterScreen} from '../screens/teams/roster';
import {useData} from '../providers/data';
import {TeamDetailQueryResponseDto} from '../services/dtos';

export type TeamDetailTabParamList = {
  scores: undefined;
  standings: undefined;
  stats: undefined;
  roster: {teamId: string};
  news: undefined;
};

const Tab = createMaterialTopTabNavigator<TeamDetailTabParamList>();

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Team Detail Stack'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamDetailTabStack: React.FC<Properties> = ({route, navigation}) => {
  const theme = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.team.town.name,
      headerStyle: {
        backgroundColor: (theme.colors as {[x: string]: string})[
          route.params.team.primaryColor.toLowerCase()
        ],
      },
      headerTintColor: theme.colors.white,
      contentStyle: {backgroundColor: theme.colors.secondaryBackground},
    });
  });

  const {activeTeam} = useData();

  React.useEffect(() => {
    if (route.params.team.id !== activeTeam.item?.id) {
      const team = new TeamDetailQueryResponseDto();
      team.id = route.params.team.id;
      activeTeam.set(team);
    }
  }, [activeTeam, route.params.team.id]);

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
              route.params.team.primaryColor.toLowerCase()
            ],
          },
        }}>
        <Tab.Screen name="scores" component={TempScreen} />
        <Tab.Screen name="standings" component={TempScreen} />
        <Tab.Screen name="stats" component={TempScreen} />
        <Tab.Screen
          name="roster"
          component={TeamRosterScreen}
          initialParams={{teamId: route.params.team.id}}
        />
        <Tab.Screen name="news" component={TempScreen} />
      </Tab.Navigator>
    </>
  );
};

export {TeamDetailTabStack};
