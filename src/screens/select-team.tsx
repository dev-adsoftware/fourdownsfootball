import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {SELECT_OPTION_DELAY} from '../constants/timers';
import {useData} from '../providers/data';
import {TeamDto} from '../services/dtos';
import {useNewGame} from './new-game';

interface SelectTeamScreenProps {}

export const SelectTeamScreen: React.FC<SelectTeamScreenProps> = props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [teams, setTeams] = React.useState<TeamDto[]>([]);
  const [isNewGameCreationConfirmed, setIsNewGameCreationConfirmed] =
    React.useState(false);

  const data = useData();
  const newGame = useNewGame();
  const fadeInScreen = useFadeInScreen();

  const fetchTeams = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedTeams = (await data.services.teams.listTeams()).items;
    setTeams(fetchedTeams);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  React.useEffect(() => {
    if (isNewGameCreationConfirmed) {
      newGame.createGame();
    }
  }, [isNewGameCreationConfirmed]);

  React.useEffect(() => {
    if (newGame.isCreatingGame) {
      fadeInScreen.push({
        component: (
          <View flex={1} alignItems="center" justifyContent="center">
            <View>
              <Spinner />
            </View>
          </View>
        ),
      });

      return () => {
        fadeInScreen.pop();
      };
    }
  }, [newGame.isCreatingGame]);

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
                    newGame.team.set(team);
                    setTimeout(() => {
                      fadeInScreen.push({
                        component: (
                          <View
                            flex={1}
                            alignItems="center"
                            justifyContent="center">
                            <View>
                              <View
                                borderRadius={8}
                                bg="white"
                                alignItems="center"
                                justifyContent="space-between">
                                <View px={30} py={20} alignItems="center">
                                  <View position="absolute" top={10} right={10}>
                                    <CircleIconButton
                                      icon="times"
                                      bg="lightGrayButton"
                                      color="black"
                                      size={30}
                                      onPress={() => {
                                        fadeInScreen.pop();
                                      }}
                                    />
                                  </View>
                                  <Icon
                                    name="check-double"
                                    size="3xl"
                                    color="black"
                                  />
                                  <Text
                                    mt={10}
                                    text={`Are you sure you want to send\nthis game request?`}
                                    textAlign="center"
                                    color="black"
                                    typeFace="sourceSansProSemibold"
                                    fontSize="headline"
                                  />
                                </View>
                                <Pressable
                                  w="full"
                                  onPress={async () => {
                                    fadeInScreen.pop();
                                    setIsNewGameCreationConfirmed(true);
                                  }}>
                                  <View
                                    bg="success"
                                    py={12}
                                    w="full"
                                    borderBottomRadius={8}
                                    alignItems="center">
                                    <Text
                                      text="Create game request"
                                      color="white"
                                      typeFace="sourceSansProSemibold"
                                      fontSize="headline"
                                    />
                                  </View>
                                </Pressable>
                              </View>
                            </View>
                          </View>
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
                    {newGame.team.value?.id === team.id && (
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
