import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {TeamDetailQueryResponseDto} from '../../services/dtos';
import {TeamDetailTabStack} from '../../stacks/team-detail';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Team Detail Stack'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamDetailScreen: React.FC<Properties> = ({route, navigation}) => {
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
      <TeamDetailTabStack
        backgroundColor={activeTeam.item?.primaryColor || 'green'}
      />
    </>
  );
};

export {TeamDetailScreen};
