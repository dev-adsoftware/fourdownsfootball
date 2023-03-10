import React from 'react';
import {CircleAbbrAvatar} from '../avatars/circle-abbr-avatar';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {GameDetailQueryResponseDto} from '../../services/dtos';
import {GameEngine} from '../../utilities/game-engine';

interface GameScoreboardHeaderProps {
  game: GameDetailQueryResponseDto;
}

const NICKNAME_FONT_SIZE = 12;
const CLOCK_FONT_SIZE = 13;
const SCORE_FONT_SIZE = 34;

export const GameScoreboardHeader: React.FC<
  GameScoreboardHeaderProps
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
          fontSize={NICKNAME_FONT_SIZE}
        />
      </View>
      <Text
        text={String(props.game.awayTeamScore)}
        typeFace="klavikaCondensedBold"
        fontSize={SCORE_FONT_SIZE}
      />
      <View alignItems="center">
        <Text
          text={`${GameEngine.formatGameTime(
            props.game.timeRemaining,
          )} - ${GameEngine.getPeriodName(props.game.period)}`}
          typeFace="sourceSansProRegular"
          fontSize={CLOCK_FONT_SIZE}
        />
        <Text
          text={GameEngine.getGameStateName(props.game.state)}
          typeFace="sourceSansProRegular"
          fontSize={CLOCK_FONT_SIZE}
        />
      </View>
      <Text
        text={String(props.game.homeTeamScore)}
        typeFace="klavikaCondensedBold"
        fontSize={SCORE_FONT_SIZE}
      />
      <View alignItems="center" pl={20}>
        <CircleAbbrAvatar
          text={GameEngine.getTeamAbbreviation(props.game.homeTeam)}
        />
        <Text
          text={props.game.homeTeam?.nickname || 'TBD'}
          typeFace="sourceSansProRegular"
          fontSize={NICKNAME_FONT_SIZE}
        />
      </View>
    </View>
  );
};
