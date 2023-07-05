import React from 'react';
import {Link} from '../components/buttons/link';
import {Icon} from '../primitives/icon';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {GameDetailQueryResponseDto} from '../services/dtos';

interface GameNudgeScreenProps {
  game: GameDetailQueryResponseDto;
}

export const GameNudgeScreen: React.FC<GameNudgeScreenProps> = props => {
  return (
    <View flex={1} alignItems="center" justifyContent="space-between">
      <View alignItems="center">
        <View py={20}>
          <Icon icon="hourglass-half" color="primary" size={20} />
        </View>
        <Text
          text={`Awaiting RSVP from ${
            props.game.awayTeamId === undefined
              ? props.game.awayOwner.firstName
              : props.game.homeOwner.firstName
          }`}
          fontSize={17}
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
            fontSize={20}
            color="white"
            mr={10}
          />
          <Icon icon="hand-point-right" color="white" size={20} />
        </View>
      </View>
      <View pb={30}>
        <Link text="REVOKE INVITATION" onPress={() => {}} />
      </View>
    </View>
  );
};
