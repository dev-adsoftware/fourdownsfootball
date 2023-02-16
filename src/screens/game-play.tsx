import React from 'react';
import {IconButton} from '../components/buttons/icon-button';
import {Link} from '../components/buttons/link';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {useData} from '../providers/data';
import {GameDetailQueryResponseDto} from '../services/dtos';
import {GameState} from '../services/dtos/types/game-state';
import {GameEngine} from '../utilities/game-engine';
import {SelectRSVPTeamScreen} from './select-rsvp-team';

interface GamePlayScreenProps {
  game: GameDetailQueryResponseDto;
}

export const GamePlayScreen: React.FC<GamePlayScreenProps> = props => {
  const fadeInScreen = useFadeInScreen();
  const data = useData();

  return (
    <>
      <View w="full" flex={1} bg="oddLayerSurface" pt={10} alignItems="center">
        {GameEngine.canNudgeOrWithdraw(props.game, data.owner?.id as string) ? (
          <View flex={1} alignItems="center" justifyContent="space-between">
            <View alignItems="center">
              <View py={20}>
                <Icon name="hourglass-half" color="primary" size="3xl" />
              </View>
              <Text
                text={`Awaiting RSVP from ${
                  props.game.awayTeamId === undefined
                    ? props.game.awayOwner.firstName
                    : props.game.homeOwner.firstName
                }`}
                fontSize="body"
                typeFace="sourceSansProRegular"
              />
              <View
                row
                alignItems="center"
                bg="primary"
                borderRadius="circle"
                px={20}
                py={5}
                m={20}>
                <Text
                  text="NUDGE"
                  typeFace="klavikaCondensedBoldItalic"
                  fontSize="title3"
                  color="white"
                  mr={10}
                />
                <Icon name="hand-point-right" color="white" size="xl" />
              </View>
            </View>
            <View pb={30}>
              <Link text="REVOKE INVITATION" onPress={() => {}} />
            </View>
          </View>
        ) : GameEngine.canRSVP(props.game, data.owner?.id as string) ? (
          <>
            <View flex={1} alignItems="center" justifyContent="space-between">
              <View alignItems="center">
                <View py={20}>
                  <Icon name="envelope" color="primary" size="3xl" />
                </View>
                <Text
                  textAlign="center"
                  text={`${
                    props.game.awayTeamId === undefined
                      ? props.game.homeOwner.firstName
                      : props.game.awayOwner.firstName
                  } invited you to play a game.\nRSVP to start the game.`}
                  fontSize="body"
                  typeFace="sourceSansProRegular"
                />
                <Pressable
                  onPress={() => {
                    fadeInScreen.push({
                      component: <SelectRSVPTeamScreen game={props.game} />,
                    });
                  }}>
                  <View
                    row
                    alignItems="center"
                    bg="primary"
                    borderRadius="circle"
                    px={20}
                    py={5}
                    m={20}>
                    <Text
                      text="RSVP"
                      typeFace="klavikaCondensedBoldItalic"
                      fontSize="title3"
                      color="white"
                      mr={10}
                    />
                    <Icon name="reply" color="white" size="xs" />
                  </View>
                </Pressable>
              </View>
              <View pb={30}>
                <Link text="REJECT INVITATION" onPress={() => {}} />
              </View>
            </View>
          </>
        ) : props.game.state === GameState.Loading ? (
          <>
            <Text
              text="loading screen"
              typeFace="sourceSansProRegular"
              fontSize="body"
            />
          </>
        ) : (
          <>
            <Text
              text="game screen"
              typeFace="sourceSansProRegular"
              fontSize="body"
            />
          </>
        )}
      </View>
    </>
  );
};
