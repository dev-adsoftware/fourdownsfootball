import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TempScreen} from '../screens/temp';
import {GamesStackParamList} from './games';
import {GameDetailScoreboard} from '../components/games/game-detail-scoreboard';
import {useData} from '../providers/data';
import {GamePlayScreen} from '../screens/games/game-play';

export type GameDetailTabParamList = {
  'Game Play': undefined;
  'Box Score': undefined;
  'Play-by-Play': undefined;
  'Game Stats': undefined;
};

const Tab = createMaterialTopTabNavigator<GameDetailTabParamList>();

type Properties = {
  route: RouteProp<GamesStackParamList, 'Game Detail Stack'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GameDetailTabStack: React.FC<Properties> = ({route, navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.game.awayTeam?.nickname} @ ${route.params.game.homeTeam?.nickname}`,
    });
  });

  const {activeGame} = useData();

  React.useEffect(() => {
    activeGame.set(route.params.game);
  }, [activeGame, route.params.game]);

  return (
    <>
      <GameDetailScoreboard activeGame={activeGame} />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarContentContainerStyle: {
            margin: 0,
          },
          tabBarItemStyle: {
            width: 'auto',
            padding: 0,
            paddingHorizontal: 10,
            margin: 0,
            minHeight: 36,
          },
          tabBarLabelStyle: {
            letterSpacing: 0.5,
          },
          swipeEnabled: false,
        }}>
        <Tab.Screen name="Game Play" component={GamePlayScreen} />
        <Tab.Screen name="Box Score" component={TempScreen} />
        <Tab.Screen name="Play-by-Play" component={TempScreen} />
        <Tab.Screen
          name="Game Stats"
          component={TempScreen}
          options={{title: 'Stats'}}
        />
      </Tab.Navigator>
    </>
  );
};

export {GameDetailTabStack};
