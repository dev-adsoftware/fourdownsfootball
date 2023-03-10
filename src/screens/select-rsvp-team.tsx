import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../primitives/icon';
import {SafeBar} from '../primitives/safe-bar';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {SELECT_OPTION_DELAY} from '../constants';
import {useData} from '../providers/data';
import {GameDetailQueryResponseDto, TeamDto} from '../services/dtos';
import {ConfirmActionScreen} from './confirm-action';
import {FloatingCircleCloseButton} from '../components/buttons/floating-circle-close-button';

interface SelectRSVPTeamScreenProps {
  game: GameDetailQueryResponseDto;
}

export const SelectRSVPTeamScreen: React.FC<
  SelectRSVPTeamScreenProps
> = props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [teams, setTeams] = React.useState<TeamDto[]>([]);
  const [selectedTeam, setSelectedTeam] = React.useState<TeamDto>();
  const [isRSVPing, setIsRSVPing] = React.useState(false);

  const data = useData();
  const {
    push: pushFadeInScreen,
    pop: popFadeInScreen,
    reset: resetFadeInScreen,
  } = useFadeInScreen();

  const fetchTeams = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedTeams = (await data.services.teams.listTeams()).items;
    setTeams(fetchedTeams);
    setIsLoading(false);
  }, [data.services.teams]);

  React.useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const sendRSVP = React.useCallback(async () => {
    await data.services.games.rsvpToGame(
      props.game,
      selectedTeam!.id,
      data.owner!.id,
    );
    resetFadeInScreen();
  }, [
    data.services.games,
    props.game,
    selectedTeam,
    data.owner,
    resetFadeInScreen,
  ]);

  React.useEffect(() => {
    if (isRSVPing) {
      sendRSVP();
      pushFadeInScreen({
        component: (
          <View flex={1} alignItems="center" justifyContent="center">
            <View>
              <Spinner />
            </View>
          </View>
        ),
      });
    }
  }, [isRSVPing, sendRSVP, pushFadeInScreen]);

  return (
    <>
      <SafeBar bg="white" />
      <View flex={1} w="full" bg="white" px={15}>
        <Text
          text="SELECT TEAM"
          typeFace="klavikaCondensedMediumItalic"
          fontSize={22}
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
                <View
                  key={team.id}
                  borderHorizontalColor="grayButton"
                  borderHorizontalWidth={1}
                  mt={-1}
                  onPress={() => {
                    setSelectedTeam(team);
                    setTimeout(() => {
                      pushFadeInScreen({
                        component: (
                          <ConfirmActionScreen
                            icon="check-double"
                            questionText={
                              'Are you sure you want to RSVP\nfor this game?'
                            }
                            buttonText="Send RSVP"
                            onConfirm={() => {
                              setIsRSVPing(true);
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
                      fontSize={17}
                      color="darkText"
                    />
                    {selectedTeam?.id === team.id && (
                      <Icon icon="check" color="primary" size={10} />
                    )}
                  </View>
                </View>
              );
            })
          )}
        </View>
      </View>
      <FloatingCircleCloseButton
        onPress={() => {
          popFadeInScreen();
        }}
      />
    </>
  );
};
