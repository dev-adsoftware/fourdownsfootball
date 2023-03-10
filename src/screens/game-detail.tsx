import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {NavPager} from '../components/navigation/nav-pager';
import {SafeBar} from '../primitives/safe-bar';
import {View} from '../primitives/view';
import {useData} from '../providers/data';
import {
  GameDetailQueryArgsDto,
  GameDetailQueryResponseDto,
} from '../services/dtos';
import {GamePlayScreen} from './game-play';
import {GamePlayByPlayScreen} from './game-play-by-play';
import {GameScoreboardHeader} from '../components/headers/game-scoreboard';
import {GameDetailFooter} from '../components/footers/game-detail-footer';

interface GameDetailScreenProps {
  gameId: string;
}

export const GameDetailScreen: React.FC<GameDetailScreenProps> = props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [game, setGame] = React.useState<GameDetailQueryResponseDto>();
  const data = useData();

  const fetchGameDetail = React.useCallback(
    async (showLoadingIndicator?: boolean) => {
      if (showLoadingIndicator) {
        setIsLoading(true);
      }
      const fetchedGame = await data.services.games.queryGameDetail(
        new GameDetailQueryArgsDto().init({id: props.gameId}),
      );
      setGame(fetchedGame);
      setIsLoading(false);
    },
    [data.services.games, props.gameId],
  );

  React.useEffect(() => {
    fetchGameDetail();
  }, [fetchGameDetail]);

  return (
    <View flex={1} bg="white">
      <SafeBar bg="white" />
      {isLoading ? (
        <>
          <View flex={1} py={20} alignItems="center" justifyContent="center">
            <Spinner />
          </View>
        </>
      ) : (
        game && (
          <>
            <GameScoreboardHeader game={game} />
            <NavPager
              pages={[
                {
                  name: 'PLAY',
                  component: <GamePlayScreen game={game} />,
                },
                {
                  name: 'PLAY BY PLAY',
                  component: <GamePlayByPlayScreen game={game} />,
                },
                {
                  name: 'BOX SCORE',
                  component: <></>,
                },
                {
                  name: 'CHAT',
                  component: <></>,
                },
              ]}
            />
            <GameDetailFooter />
          </>
        )
      )}
    </View>
  );
};
