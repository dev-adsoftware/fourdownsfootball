import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList, SelectListOption} from '../../components/core/select/list';
import {NationDto} from '../../services/dtos';
import {NationsService} from '../../services/nations';
import {TeamsStackParamList} from '../../stacks/teams';
import {EmojiDecoder} from '../../utilities/emoji-decoder';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Nation Select'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [nations, setNations] = React.useState<NationDto[]>([]);

  const fetchNations = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedNations = (
      await new NationsService().listNations()
    ).items.sort((a: NationDto, b: NationDto) => {
      return a.name > b.name ? 1 : -1;
    });
    setNations(fetchedNations);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    fetchNations();
  }, [fetchNations]);

  return (
    <SelectList
      options={nations.map((nation: NationDto): SelectListOption => {
        return {
          id: nation.id,
          label: `${EmojiDecoder.decode(nation.abbr)} ${nation.name}`,
          filter: nation.name,
        };
      })}
      isLoading={isLoading}
      searchPlaceholder="Search Countries"
      selectedOptionId={route.params.selectedNation?.id}
      onSelect={(optionId: string) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {
            [route.params.returnParamKey]: nations.filter(
              (nation: NationDto) => {
                return nation.id === optionId;
              },
            )[0],
          },
          merge: true,
        });
      }}
    />
  );
};

export {Component as NationSelectScreen};
