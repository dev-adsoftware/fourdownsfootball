import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {useStack} from '../components/navigation/stack-pager';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {SELECT_OPTION_DELAY} from '../constants/timers';
import {useData} from '../providers/data';
import {OwnerDto} from '../services/dtos';
import {useNewGame} from './new-game';
import {SelectTeamScreen} from './select-team';

interface SelectOpponentScreenProps {}

export const SelectOpponentScreen: React.FC<
  SelectOpponentScreenProps
> = props => {
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
  }, []);

  React.useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  return (
    <>
      <View flex={1} w="full" bg="white" px={15}>
        <Text
          text="SELECT OPPONENT"
          typeFace="klavikaCondensedMediumItalic"
          fontSize="title2"
          py={20}
        />
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
                <Pressable
                  key={owner.id}
                  borderHorizontalColor="grayButton"
                  borderHorizontalWidth={1}
                  mt={-1}
                  onPress={() => {
                    newGame.opponent.set(owner);
                    setTimeout(() => {
                      stack.push({component: <SelectTeamScreen />});
                    }, SELECT_OPTION_DELAY);
                  }}>
                  <View row alignItems="center" justifyContent="space-between">
                    <Text
                      py={10}
                      text={`${owner.firstName} ${owner.lastName}`}
                      typeFace="sourceSansProRegular"
                      fontSize="body"
                      color="primaryText"
                    />
                    {newGame.opponent.value?.id === owner.id && (
                      <Icon name="check" color="primary" size="2xs" />
                    )}
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </View>
    </>
  );
};
