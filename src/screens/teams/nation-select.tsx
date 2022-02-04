import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList} from '../../components/core/select/list';
import {Nation, NationsService} from '../../services/nations';
import {TeamsStackParamList} from '../../stacks/teams';
import {EmojiDecoder} from '../../utilities/emoji-decoder';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Nation Select'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [options, setOptions] = React.useState<Nation[]>([]);

  const fetchNations = React.useCallback(async () => {
    setIsLoading(true);
    const nations = (await new NationsService().list()).items.sort(
      (a: Nation, b: Nation) => {
        return a.name > b.name ? 1 : -1;
      },
    );
    setOptions(nations);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    fetchNations();
  }, [fetchNations]);

  const labelFn = React.useCallback((nation: Nation) => {
    return `${EmojiDecoder.decode(nation.abbr)} ${nation.name}`;
  }, []);

  return (
    <SelectList<Nation>
      options={options}
      labelFn={labelFn}
      isLoading={isLoading}
      searchPlaceholder="Search Countries"
      selectedOption={route.params.selectedNation}
      onSelect={(option: Nation) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {[route.params.returnParamKey]: option},
          merge: true,
        });
      }}
    />
  );
};

export {Component as NationSelectScreen};
