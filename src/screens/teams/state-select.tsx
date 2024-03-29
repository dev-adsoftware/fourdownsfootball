import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList, SelectListOption} from '../../components/core/select/list';
import {StateDto} from '../../services/dtos';
import {StatesService} from '../../services/states';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'State Select'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [states, setStates] = React.useState<StateDto[]>([]);

  const fetchStates = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedStates = (
      await new StatesService().listByNation(route.params?.nationId)
    ).items.sort((a: StateDto, b: StateDto) => {
      return a.name > b.name ? 1 : -1;
    });
    setStates(fetchedStates);
    setIsLoading(false);
  }, [route.params.nationId]);

  React.useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  return (
    <SelectList
      options={states.map((state: StateDto): SelectListOption => {
        return {id: state.id, label: state.name, filter: state.name};
      })}
      isLoading={isLoading}
      searchPlaceholder="Search States"
      selectedOptionId={route.params.selectedState?.id}
      onSelect={(optionId: string) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {
            [route.params.returnParamKey]: states.filter((state: StateDto) => {
              return state.id === optionId;
            })[0],
          },
          merge: true,
        });
      }}
    />
  );
};

export {Component as StateSelectScreen};
