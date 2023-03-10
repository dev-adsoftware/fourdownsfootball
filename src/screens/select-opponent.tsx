import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {StackHeader, useStack} from '../components/navigation/stack-pager';
import {View} from '../primitives/view';
import {SELECT_OPTION_DELAY} from '../constants';
import {useData} from '../providers/data';
import {OwnerDto} from '../services/dtos';
import {useNewGame} from './new-game';
import {SelectTeamScreen} from './select-team';
import {SelectListItem} from '../components/lists/select-list-item';

interface SelectOpponentScreenProps {}

export const SelectOpponentScreen: React.FC<SelectOpponentScreenProps> = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [owners, setOwners] = React.useState<OwnerDto[]>([]);

  const data = useData();
  const stack = useStack();
  const newGame = useNewGame();

  const fetchOwners = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedOwners = (
      await data.services.owners.listOwners()
    ).items.filter((item: OwnerDto) => {
      return item.id !== data.owner?.id && item.id !== 'system';
    });
    setOwners(fetchedOwners);
    setIsLoading(false);
  }, [data.services.owners, data.owner]);

  React.useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  return (
    <>
      <View flex={1} w="full" bg="white" px={15}>
        <View pb={10}>
          <StackHeader headerText="SELECT OPPONENT" />
        </View>
        <View>
          {isLoading ? (
            <>
              <View flex={1} alignItems="center">
                <Spinner />
              </View>
            </>
          ) : (
            owners.map(owner => {
              return (
                <SelectListItem
                  key={owner.id}
                  text={`${owner.firstName} ${owner.lastName}`}
                  selected={newGame.opponent.value?.id === owner.id}
                  onPress={() => {
                    newGame.opponent.set(owner);
                    setTimeout(() => {
                      stack.push({component: <SelectTeamScreen />});
                    }, SELECT_OPTION_DELAY);
                  }}
                />
              );
            })
          )}
        </View>
      </View>
    </>
  );
};
