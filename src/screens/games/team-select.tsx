import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList} from '../../components/core/select/list';
import {useAuth} from '../../providers/auth';
import {Team, TeamsService} from '../../services/teams';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Team Select'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [options, setOptions] = React.useState<Team[]>([]);

  const auth = useAuth();

  const fetchTeams = React.useCallback(async () => {
    setIsLoading(true);
    const teams = (
      await new TeamsService().listByOwner(auth.owner?.id as string)
    ).items.sort((a: Team, b: Team) => {
      return a.town.name > b.town.name ? 1 : -1;
    });
    setOptions(teams);
    setIsLoading(false);
  }, [auth.owner]);

  React.useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <SelectList<Team>
      options={options}
      labelKey="nickname"
      isLoading={isLoading}
      selectedOption={route.params.selectedTeam}
      onSelect={(option: Team) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {[route.params.returnParamKey]: option},
          merge: true,
        });
      }}
    />
  );
};

export {Component as TeamSelectScreen};
