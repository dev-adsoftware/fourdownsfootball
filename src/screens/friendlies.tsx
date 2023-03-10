import React from 'react';
import {SafeBar} from '../primitives/safe-bar';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {NavPager} from '../components/navigation/nav-pager';
import {FriendliesGamesScreen} from './friendlies-games';

interface FriendliesScreenProps {}

const BaseScreen: React.FC<{}> = () => {
  return (
    <>
      <View w="full" flex={1} bg="primary" />
    </>
  );
};

const TeamsScreen: React.FC<{}> = ({}) => {
  return (
    <>
      <View w="full" flex={1} bg="secondary" />
    </>
  );
};

export const FriendliesScreen: React.FC<FriendliesScreenProps> = ({}) => {
  return (
    <>
      <SafeBar />
      <View flex={1} w="full" bg="oddLayerSurface">
        <View row bg="white" px={15} pb={20}>
          <Text
            text="FRIENDLIES"
            typeFace="klavikaCondensedBoldItalic"
            fontSize={26}
          />
        </View>
        <NavPager
          pages={[
            {name: 'GAMES', component: <FriendliesGamesScreen />},
            {name: 'FRIENDS', component: <BaseScreen />},
            {name: 'MESSAGES', component: <TeamsScreen />},
            {name: 'LADDER RANKINGS', component: <BaseScreen />},
          ]}
        />
      </View>
    </>
  );
};
