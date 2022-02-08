import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SelectList} from '../../components/core/select/list';
import {useAuth} from '../../providers/auth';
import {Owner, OwnersService} from '../../services/owners';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Owner Select'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const Component: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [options, setOptions] = React.useState<Owner[]>([]);

  const auth = useAuth();

  const fetchOwners = React.useCallback(async () => {
    setIsLoading(true);
    const owners = (await new OwnersService().list()).items.filter(
      (item: Owner) => {
        return item.id !== auth.owner?.id;
      },
    );
    setOptions(owners);
    setIsLoading(false);
  }, [auth.owner]);

  React.useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  return (
    <SelectList<Owner>
      options={options}
      isLoading={isLoading}
      searchPlaceholder="Search Owners"
      selectedOption={route.params.selectedOwner}
      onSelect={(option: Owner) => {
        navigation.navigate({
          name: route.params.returnRoute,
          params: {[route.params.returnParamKey]: option},
          merge: true,
        });
      }}
    />
  );
};

export {Component as OwnerSelectScreen};
