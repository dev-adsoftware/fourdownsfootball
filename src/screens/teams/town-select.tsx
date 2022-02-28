import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList, SelectListOption} from '../../components/core/select/list';
import {Town, TownsService} from '../../services/towns';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Town Select'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [towns, setTowns] = React.useState<Town[]>([]);

  const fetchStates = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedTowns = (
      await new TownsService().listByState(route.params.stateId)
    ).items.sort((a: Town, b: Town) => {
      return a.name > b.name ? 1 : -1;
    });
    setTowns(fetchedTowns);
    setIsLoading(false);
  }, [route.params.stateId]);

  React.useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  return (
    <SelectList
      options={towns.map((town: Town): SelectListOption => {
        return {id: town.id, label: town.name, filter: town.name};
      })}
      isLoading={isLoading}
      searchPlaceholder="Search Cities"
      selectedOptionId={route.params.selectedTown?.id}
      onSelect={(optionId: string) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {
            [route.params.returnParamKey]: towns.filter((town: Town) => {
              return town.id === optionId;
            })[0],
          },
          merge: true,
        });
      }}
    />
  );
};

export {Component as TownSelectScreen};
