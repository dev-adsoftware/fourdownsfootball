import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList} from '../../components/core/select/list';
import {useData} from '../../providers/data';
import {Team} from '../../services/teams';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Team Select'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const {teams} = useData();

  return (
    <SelectList<Team>
      options={teams.items.sort((a: Team, b: Team) => {
        return a.town.name > b.town.name ? 1 : -1;
      })}
      labelKey="nickname"
      isLoading={false}
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
