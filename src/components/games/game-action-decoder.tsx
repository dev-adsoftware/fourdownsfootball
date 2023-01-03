import React from 'react';
// import {StyleSheet} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../hoc/with-styles';
import {GameDetailQueryResponseDto} from '../../services/dtos';
import {GameEngine} from '../../utilities/game-engine';
import {GameCoinTossAction} from './game-coin-toss-action';

interface Properties extends InjectedThemeProps {
  game: GameDetailQueryResponseDto;
}

const Component: React.FC<Properties> = props => {
  const {game} = props;
  //   const styles = StyleSheet.create({});

  const decodeActionFromState = (): React.ReactNode => {
    if (game.state === 'Awaiting Coin Toss') {
      return <GameCoinTossAction actingTeam={GameEngine.getActingTeam(game)} />;
    }

    return <></>;
  };

  return <>{decodeActionFromState()}</>;
};

export const GameActionDecoder = withTheme(Component);
