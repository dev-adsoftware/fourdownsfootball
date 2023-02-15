import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {SafeBar} from '../components/primitives/safe-bar';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {SAFE_AREA_PADDING_BOTTOM} from '../constants/safe-area';
import {SELECT_OPTION_DELAY} from '../constants/timers';
import {useData} from '../providers/data';
import {GameDetailQueryResponseDto, TeamDto} from '../services/dtos';
import {ConfirmActionScreen} from './confirm-action';

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

  const sendRSVP = React.useCallback(async () => {
    await data.services.games.rsvpToGame(
      props.game,
      selectedTeam!.id,
      data.owner!.id,
    );
    fadeInScreen.reset();
  }, [selectedTeam]);

  React.useEffect(() => {
    if (isRSVPing) {
      sendRSVP();
      fadeInScreen.push({
        component: (
          <View flex={1} alignItems="center" justifyContent="center">
            <View>
              <Spinner />
            </View>
          </View>
        ),
      });
    }
  }, [isRSVPing, sendRSVP]);

  return (
    <>
      <SafeBar bg="white" />
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
                    setSelectedTeam(team);
                    setTimeout(() => {
                      fadeInScreen.push({
                        component: (
                          <ConfirmActionScreen
                            icon="check-double"
                            questionText={`Are you sure you want to RSVP\nfor this game?`}
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
                      fontSize="body"
                      color="primaryText"
                    />
                    {selectedTeam?.id === team.id && (
                      <Icon name="check" color="primary" size="2xs" />
                    )}
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </View>
      <View
        position="absolute"
        bottom={SAFE_AREA_PADDING_BOTTOM}
        right={20}
        w={75}
        h={75}
        alignItems="center"
        justifyContent="center">
        <CircleIconButton
          icon="times"
          onPress={e => {
            fadeInScreen.pop();
          }}
          size={60}
        />
      </View>
    </>
  );
};
