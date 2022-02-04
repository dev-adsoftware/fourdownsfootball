import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList} from '../../components/core/select/list';
import {State, StatesService} from '../../services/states';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'State Select'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [options, setOptions] = React.useState<State[]>([]);

  const fetchStates = React.useCallback(async () => {
    setIsLoading(true);
    const states = (
      await new StatesService().listByNation(route.params?.nationId)
    ).items.sort((a: State, b: State) => {
      return a.name > b.name ? 1 : -1;
    });
    setOptions(states);
    setIsLoading(false);
  }, [route.params.nationId]);

  React.useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  return (
    <SelectList<State>
      isLoading={isLoading}
      searchPlaceholder="Search States"
      options={options}
      selectedOption={route.params.selectedState}
      onSelect={(option: State) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {[route.params.returnParamKey]: option},
          merge: true,
        });
      }}
    />
  );
};

export {Component as StateSelectScreen};
