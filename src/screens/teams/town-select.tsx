import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList} from '../../components/core/select/list';
import {Town, TownsService} from '../../services/towns';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Town Select'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [options, setOptions] = React.useState<Town[]>([]);

  const fetchStates = React.useCallback(async () => {
    setIsLoading(true);
    const towns = (
      await new TownsService().listByState(route.params.stateId)
    ).items.sort((a: Town, b: Town) => {
      return a.name > b.name ? 1 : -1;
    });
    setOptions(towns);
    setIsLoading(false);
  }, [route.params.stateId]);

  React.useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  return (
    <SelectList<Town>
      isLoading={isLoading}
      searchPlaceholder="Search Cities"
      options={options}
      selectedOption={route.params.selectedTown}
      onSelect={(option: Town) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {[route.params.returnParamKey]: option},
          merge: true,
        });
      }}
    />
  );
};

export {Component as TownSelectScreen};
