import React from 'react';
import {SafeBar} from '../primitives/safe-bar';
import {View} from '../primitives/view';
import {useData} from '../providers/data';
import {NavPager} from '../components/navigation/nav-pager';
import {WelcomeHeader} from '../components/headers/welcome-header';

interface HomeScreenProps {}

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

export const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const data = useData();

  return (
    <>
      <SafeBar />
      <View flex={1} w="full" bg="oddLayerSurface">
        <WelcomeHeader name={data.owner!.firstName} />
        <NavPager
          pages={[
            {name: 'NEWS', component: <BaseScreen />},
            {name: 'SCORES', component: <TeamsScreen />},
            {name: 'STANDINGS', component: <BaseScreen />},
            {name: 'RANKINGS', component: <TeamsScreen />},
            {name: 'TRANSFER MARKET', component: <BaseScreen />},
          ]}
        />
      </View>
    </>
  );
};
