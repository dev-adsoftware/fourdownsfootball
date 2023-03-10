import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../primitives/icon';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {SELECT_OPTION_DELAY} from '../constants';
import {useData} from '../providers/data';
import {TeamDto} from '../services/dtos';
import {ConfirmActionScreen} from './confirm-action';
import {useNewGame} from './new-game';
import {SelectListItem} from '../components/lists/select-list-item';
import {StackHeader} from '../components/navigation/stack-pager';

interface SelectTeamScreenProps {}

export const SelectTeamScreen: React.FC<SelectTeamScreenProps> = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [teams, setTeams] = React.useState<TeamDto[]>([]);
  const [isNewGameCreationConfirmed, setIsNewGameCreationConfirmed] =
    React.useState(false);

  const data = useData();
  const {isCreatingGame, createGame, team: newGameTeam} = useNewGame();
  const {push: pushFadeInScreen, pop: popFadeInScreen} = useFadeInScreen();

  const fetchTeams = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedTeams = (await data.services.teams.listTeams()).items;
    setTeams(fetchedTeams);
    setIsLoading(false);
  }, [data.services.teams]);

  React.useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  React.useEffect(() => {
    if (isNewGameCreationConfirmed) {
      setIsNewGameCreationConfirmed(false);
      createGame();
    }
  }, [isNewGameCreationConfirmed, createGame]);

  React.useEffect(() => {
    if (isCreatingGame) {
      pushFadeInScreen({
        component: (
          <View flex={1} alignItems="center" justifyContent="center">
            <View>
              <Spinner />
            </View>
          </View>
        ),
      });

      return () => {
        popFadeInScreen();
      };
    }
  }, [isCreatingGame, pushFadeInScreen, popFadeInScreen]);

  return (
    <>
      <View flex={1} w="full" bg="white" px={15}>
        <View pb={10}>
          <StackHeader headerText="SELECT TEAM" />
        </View>
        <View>
          {isLoading ? (
            <>
              <View flex={1} alignItems="center">
                <Spinner />
              </View>
            </>
          ) : (
            teams.map(team => {
              return (
                <SelectListItem
                  key={team.id}
                  text={`${team.nickname}`}
                  selected={newGameTeam.value?.id === team.id}
                  onPress={() => {
                    newGameTeam.set(team);
                    setTimeout(() => {
                      pushFadeInScreen({
                        component: (
                          <ConfirmActionScreen
                            icon="check-double"
                            questionText={
                              'Are you sure you want to send\nthis game request?'
                            }
                            buttonText="Create game request"
                            onConfirm={() => {
                              setIsNewGameCreationConfirmed(true);
                            }}
                          />
                        ),
                      });
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
