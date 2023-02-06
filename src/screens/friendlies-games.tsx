import React from 'react';
import {CircleAbbrAvatar} from '../components/avatars/circle-abbr-avatar';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {NavPager} from '../components/navigation/nav-pager';
import {Pressable} from '../components/primitives/pressable';
import {SafeBar} from '../components/primitives/safe-bar';
import {ScrollView} from '../components/primitives/scroll-view';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {useData} from '../providers/data';
import {
  GameRequestsByOwnerQueryArgsDto,
  GameRequestsByOwnerQueryResponseDto,
} from '../services/dtos';

interface FriendliesGamesScreenProps {}

const BaseScreen: React.FC<{}> = () => {
  return (
    <>
      <View w="full" flex={1} bg="primary" />
    </>
  );
};

const TeamsScreen: React.FC<{}> = ({}) => {
  return (
    <>
      <View w="full" flex={1} bg="secondary" />
    </>
  );
};

export const FriendliesGamesScreen: React.FC<
  FriendliesGamesScreenProps
> = props => {
  const [gameRequestsByOwner, setGameRequestsByOwner] =
    React.useState<GameRequestsByOwnerQueryResponseDto>();
  const data = useData();
  const fadeInScreen = useFadeInScreen();

  const fetchGameRequestsByOwner = React.useCallback(async () => {
    if (data.owner?.id) {
      const fetchedGameRequestsByOwner =
        await data.services.gameRequests.queryGameRequestsByOwner(
          new GameRequestsByOwnerQueryArgsDto().init({
            id: data.owner.id,
          }),
        );
      setGameRequestsByOwner(fetchedGameRequestsByOwner);
    }
  }, [data.owner]);

  React.useEffect(() => {
    fetchGameRequestsByOwner();
  }, []);
  return (
    <>
      <ScrollView flex={1} w="full">
        {gameRequestsByOwner &&
          gameRequestsByOwner.gameRequests.map(gameRequest => {
            return (
              <View key={gameRequest.id} w="full" py={20}>
                <Pressable
                  onPress={() => {
                    fadeInScreen.push({
                      component: (
                        <>
                          <View flex={1} debugColor="green">
                            <SafeBar bg="white" />
                            <View
                              row
                              bg="white"
                              py={20}
                              px={20}
                              alignItems="center"
                              justifyContent="space-between">
                              <CircleAbbrAvatar
                                text={`${
                                  gameRequest.invitedTeam
                                    ? gameRequest.invitedTeam.nickname
                                        .slice(0, 1)
                                        .toUpperCase()
                                    : '?'
                                }`}
                              />
                              <View>
                                <Text
                                  text="Awaiting RSVP"
                                  typeFace="sourceSansProRegular"
                                  fontSize="footnote"
                                />
                              </View>
                              <CircleAbbrAvatar
                                text={`${
                                  gameRequest.team
                                    ? gameRequest.team.nickname
                                        .slice(0, 1)
                                        .toUpperCase()
                                    : '?'
                                }`}
                              />
                            </View>
                            <NavPager
                              pages={[
                                {
                                  name: 'PLAY',
                                  component: <TeamsScreen />,
                                },
                                {
                                  name: 'PLAY BY PLAY',
                                  component: <BaseScreen />,
                                },
                                {
                                  name: 'BOX SCORE',
                                  component: <TeamsScreen />,
                                },
                                {
                                  name: 'CHAT',
                                  component: <BaseScreen />,
                                },
                              ]}
                            />
                            <Pressable
                              alignItems="center"
                              onPress={() => {
                                fadeInScreen.pop();
                              }}>
                              <View w={100} h={100} debugColor="red" />
                            </Pressable>
                          </View>
                        </>
                      ),
                    });
                  }}>
                  <View
                    row
                    bg="white"
                    alignItems="center"
                    px={10}
                    py={5}
                    borderHorizontalWidth={1}
                    borderColor="oddLayerSurface">
                    <CircleAbbrAvatar
                      text={
                        gameRequest.invitedOwner.firstName
                          .slice(0, 1)
                          .toUpperCase() || '?'
                      }
                    />
                    <View px={20}>
                      <Text
                        text={
                          gameRequest.invitedTeam
                            ? `${gameRequest.invitedTeam.nickname.toUpperCase()}`
                            : 'TBD'
                        }
                        typeFace="klavikaCondensedMedium"
                        fontSize="headline"
                      />
                      <Text
                        mt={-5}
                        text={`${gameRequest.invitedOwner.firstName} ${gameRequest.invitedOwner.lastName}`}
                        typeFace="sourceSansProSemibold"
                        fontSize="footnote"
                      />
                      <Text
                        mt={3}
                        text={
                          gameRequest.team
                            ? `${gameRequest.team.town.name.toUpperCase()} ${gameRequest.team.nickname.toUpperCase()}`
                            : 'N/A'
                        }
                        typeFace="klavikaCondensedMedium"
                        fontSize="headline"
                      />
                      <Text
                        mt={-5}
                        text={`${gameRequest.owner.firstName} ${gameRequest.owner.lastName}`}
                        typeFace="sourceSansProSemibold"
                        fontSize="footnote"
                      />
                    </View>
                    <View flex={1} alignItems="flex-end">
                      <CircleIconButton
                        icon="clock"
                        onPress={() => {}}
                        bg="white"
                        color="primary"
                      />
                    </View>
                  </View>
                </Pressable>
              </View>
            );
          })}
      </ScrollView>
    </>
  );
};
