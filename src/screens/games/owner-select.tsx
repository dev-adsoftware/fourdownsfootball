import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList, SelectListOption} from '../../components/core/select/list';
import {useData} from '../../providers/data';
import {OwnerDto} from '../../services/dtos';
import {OwnersService} from '../../services/owners';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Owner Select'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [owners, setOwners] = React.useState<OwnerDto[]>([]);

  const {ownerDashboard} = useData();

  const fetchOwners = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedOwners = (await new OwnersService().listOwners()).items.filter(
      (item: OwnerDto) => {
        return item.id !== ownerDashboard.item?.owner.id;
      },
    );
    setOwners(fetchedOwners);
    setIsLoading(false);
  }, [ownerDashboard.item?.owner.id]);

  React.useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  return (
    <SelectList
      options={owners.map((owner: OwnerDto): SelectListOption => {
        return {id: owner.id, label: owner.email, filter: owner.name};
      })}
      isLoading={isLoading}
      searchPlaceholder="Search Owners"
      selectedOptionId={route.params.selectedOwner?.id}
      onSelect={(optionId: string) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {
            [route.params.returnParamKey]: owners.filter((owner: OwnerDto) => {
              return owner.id === optionId;
            })[0],
          },
          merge: true,
        });
      }}
    />
  );
};

export {Component as OwnerSelectScreen};
