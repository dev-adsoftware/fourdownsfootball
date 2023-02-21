import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {SELECT_OPTION_DELAY} from '../constants/timers';
import {useData} from '../providers/data';
import {TeamDto} from '../services/dtos';
import {ConfirmActionScreen} from './confirm-action';
import {useNewGame} from './new-game';

interface SelectTeamScreenProps {}

export const SelectTeamScreen: React.FC<SelectTeamScreenProps> = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [teams, setTeams] = React.useState<TeamDto[]>([]);
  const [isNewGameCreationConfirmed, setIsNewGameCreationConfirmed] =
    React.useState(false);

  const data = useData();
  const {isCreatingGame, createGame, team: newGameTeam} = useNewGame();
  const {push, pop} = useFadeInScreen();

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
    console.log('use effect for game creation');
    if (isNewGameCreationConfirmed) {
      console.log('creating game');
      setIsNewGameCreationConfirmed(false);
      createGame();
    }
  }, [isNewGameCreationConfirmed, createGame]);

  React.useEffect(() => {
    if (isCreatingGame) {
      push({
        component: (
          <View flex={1} alignItems="center" justifyContent="center">
            <View>
              <Spinner />
            </View>
          </View>
        ),
      });

      return () => {
        pop();
      };
    }
  }, [isCreatingGame, push, pop]);

  return (
    <>
      <View flex={1} w="full" bg="white" px={15}>
        <Text
          text="SELECT TEAM"
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
            teams.map(team => {
              return (
                <Pressable
                  key={team.id}
                  borderHorizontalColor="grayButton"
                  borderHorizontalWidth={1}
                  mt={-1}
                  onPress={() => {
                    newGameTeam.set(team);
                    setTimeout(() => {
                      push({
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
                  }}>
                  <View row alignItems="center" justifyContent="space-between">
                    <Text
                      py={10}
                      text={`${team.nickname}`}
                      typeFace="sourceSansProRegular"
                      fontSize="body"
                      color="primaryText"
                    />
                    {newGameTeam.value?.id === team.id && (
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
