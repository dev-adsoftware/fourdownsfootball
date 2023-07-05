import React from 'react';
import {Link} from '../components/buttons/link';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../primitives/icon';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {GameDetailQueryResponseDto} from '../services/dtos';
import {SelectRSVPTeamScreen} from './select-rsvp-team';

interface GameRsvpScreenProps {
  game: GameDetailQueryResponseDto;
}

export const GameRsvpScreen: React.FC<GameRsvpScreenProps> = props => {
  const {push: pushFadeInScreen} = useFadeInScreen();

  return (
    <View flex={1} alignItems="center" justifyContent="space-between">
      <View alignItems="center">
        <View py={20}>
          <Icon icon="envelope" color="primary" size={24} />
        </View>
        <Text
          textAlign="center"
          text={`${
            props.game.awayTeamId === undefined
              ? props.game.homeOwner.firstName
              : props.game.awayOwner.firstName
          } invited you to play a game.\nRSVP to start the game.`}
          fontSize={17}
          typeFace="sourceSansProRegular"
        />
        <View
          onPress={() => {
            pushFadeInScreen({
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
              fontSize={20}
              color="white"
              mr={10}
            />
            <Icon icon="reply" color="white" size={12} />
          </View>
        </View>
      </View>
      <View pb={30}>
        <Link text="REJECT INVITATION" onPress={() => {}} />
      </View>
    </View>
  );
};
