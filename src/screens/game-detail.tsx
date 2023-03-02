import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {IconButton} from '../components/buttons/icon-button';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {NavPager} from '../components/navigation/nav-pager';
import {SafeBar} from '../components/primitives/safe-bar';
import {View} from '../components/primitives/view';
import {useData} from '../providers/data';
import {
  GameDetailQueryArgsDto,
  GameDetailQueryResponseDto,
} from '../services/dtos';
import {GamePlayScreen} from './game-play';
import {GamePlayByPlayScreen} from './game-play-by-play';
import {GameScoreboardHeader} from '../components/headers/game-scoreboard';

interface GameDetailScreenProps {
  gameId: string;
}

export const GameDetailScreen: React.FC<GameDetailScreenProps> = props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [game, setGame] = React.useState<GameDetailQueryResponseDto>();
  const data = useData();
  const fadeInScreen = useFadeInScreen();

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
          <View flex={1} py={20} alignItems="center">
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
            <View row justifyContent="space-between" bg="white" px={10} pb={15}>
              <View>
                <IconButton
                  icon="cogs"
                  color="primary"
                  size="xl"
                  pressableAreaPadding={20}
                  onPress={() => {
                    fadeInScreen.pop();
                  }}
                />
              </View>
              <View>
                <IconButton
                  icon="times"
                  color="primary"
                  size="3xl"
                  pressableAreaPadding={20}
                  onPress={() => {
                    fadeInScreen.pop();
                  }}
                />
              </View>
            </View>
          </>
        )
      )}
    </View>
  );
};
