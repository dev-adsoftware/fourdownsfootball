import React from 'react';
import {CircleAbbrAvatar} from '../components/avatars/circle-abbr-avatar';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {GameDetailQueryResponseDto} from '../services/dtos';
import {GameEngine} from '../utilities/game-engine';

interface GameScoreboardScreenProps {
  game: GameDetailQueryResponseDto;
}

export const GameScoreboardScreen: React.FC<
  GameScoreboardScreenProps
> = props => {
  return (
    <View
      row
      bg="white"
      py={10}
      px={20}
      alignItems="center"
      justifyContent="space-evenly">
      <View alignItems="center" pr={20}>
        <CircleAbbrAvatar
          text={GameEngine.getTeamAbbreviation(props.game.awayTeam)}
        />
        <Text
          text={props.game.awayTeam?.nickname || 'TBD'}
          typeFace="sourceSansProRegular"
          fontSize="footnote"
        />
      </View>
      <Text
        text={String(props.game.awayTeamScore)}
        typeFace="klavikaCondensedBold"
        fontSize="title1"
      />
      <View alignItems="center">
        <Text
          text={`${GameEngine.formatGameTime(
            props.game.timeRemaining,
          )} - ${GameEngine.getPeriodName(props.game.period)}`}
          typeFace="sourceSansProRegular"
          fontSize="footnote"
        />
        <Text
          text={GameEngine.getGameStateName(props.game.state)}
          typeFace="sourceSansProRegular"
          fontSize="footnote"
        />
      </View>
      <Text
        text={String(props.game.homeTeamScore)}
        typeFace="klavikaCondensedBold"
        fontSize="title1"
      />
      <View alignItems="center" pl={20}>
        <CircleAbbrAvatar
          text={GameEngine.getTeamAbbreviation(props.game.homeTeam)}
        />
        <Text
          text={props.game.homeTeam?.nickname || 'TBD'}
          typeFace="sourceSansProRegular"
          fontSize="footnote"
        />
      </View>
    </View>
  );
};
