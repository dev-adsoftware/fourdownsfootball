import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TempScreen} from '../screens/temp';
import {GamePlayScreen} from '../screens/games/game-play';

export type GameDetailTabParamList = {
  'Game Play': undefined;
  'Box Score': undefined;
  'Play-by-Play': undefined;
  'Game Stats': undefined;
};

const Tab = createMaterialTopTabNavigator<GameDetailTabParamList>();

type Properties = {};

const GameDetailTabStack: React.FC<Properties> = ({}) => {
  return (
    <>
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
