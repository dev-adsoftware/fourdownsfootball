import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList, SelectListOption} from '../../components/core/select/list';
import {useData} from '../../providers/data';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Team Select'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const {ownerDashboard} = useData();

  return (
    <SelectList
      options={
        ownerDashboard.item?.teams
          .sort((a, b) => {
            return a.town.name > b.town.name ? 1 : -1;
          })
          .map((team): SelectListOption => {
            return {
              id: team.id,
              label: `${team.town.name} ${team.nickname}`,
              filter: `${team.town.name}|${team.nickname}`,
            };
          }) || []
      }
      isLoading={false}
      selectedOptionId={route.params.selectedTeam?.id}
      onSelect={(optionId: string) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {
            [route.params.returnParamKey]: ownerDashboard.item?.teams.filter(
              team => {
                return team.id === optionId;
              },
            )[0],
          },
          merge: true,
        });
      }}
    />
  );
};

export {Component as TeamSelectScreen};
