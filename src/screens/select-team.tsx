import React from 'react';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {FadeInScreen} from '../components/navigation/fade-in-screen';
import {Stack} from '../components/navigation/stack-pager';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {SafeBar} from '../components/primitives/safe-bar';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {SELECT_OPTION_DELAY} from '../constants/timers';
import {useData} from '../providers/data';
import {OwnerDto, TeamDto} from '../services/dtos';
import {useNewGame} from './new-game';

interface SelectTeamScreenProps {}

export const SelectTeamScreen: React.FC<SelectTeamScreenProps> = props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [teams, setTeams] = React.useState<TeamDto[]>([]);

  const [fadeInScreen, setFadeInScreen] = React.useState<
    React.ReactNode | undefined
  >();

  const data = useData();
  const newGame = useNewGame();
  const stack = Stack.useStack();

  const fetchTeams = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedTeams = (await data.services.teams.listTeams()).items;
    setTeams(fetchedTeams);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

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
          {teams.map(team => {
            return (
              <Pressable
                key={team.id}
                borderHorizontalColor="grayButton"
                borderHorizontalWidth={1}
                mt={-1}
                onPress={() => {
                  newGame.team.set(team.id);
                  setTimeout(() => {
                    setFadeInScreen(<View h={100} w={100} debugColor="red" />);
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
                  {newGame.team.value === team.id && (
                    <Icon name="check" color="primary" size="2xs" />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
      <FadeInScreen isVisible={fadeInScreen !== undefined}>
        {fadeInScreen}
      </FadeInScreen>
    </>
  );
};
