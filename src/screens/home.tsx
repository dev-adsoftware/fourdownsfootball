import React from 'react';
import {SafeBar} from '../primitives/safe-bar';
import {View} from '../primitives/view';
import {useData} from '../providers/data';
import {NavPager} from '../components/navigation/nav-pager';
import {WelcomeHeader} from '../components/headers/welcome-header';
import {FaceSvg} from '../components/svg/faces/face-svg';

interface HomeScreenProps {}

const BaseScreen: React.FC<{}> = () => {
  return (
    <>
      <View row w="full" flex={1} bg="oddLayerSurface">
        <FaceSvg
          w="150"
          h="225"
          body="body5"
          jersey="jersey1"
          head="head1"
          hairBackground="longHairBackground"
          ear="ear1"
          eyeLine="eyeLine1"
          smileLine="smileLine1"
          miscLine="forehead2"
          facialHair="beard3"
          eye="eye6"
          eyebrow="eyebrow6"
          mouth="smile2"
          nose="nose8"
          hair="afro1"
          skinColor="#bb876f"
          primaryColor="blue"
          secondaryColor="white"
          accentColor="white"
          headShaveColor="rgba(0,0,0,0)"
          faceShaveColor="rgba(0,0,0,0)"
          hairColor="black"
        />
        <FaceSvg
          w="150"
          h="225"
          body="body4"
          jersey="jersey5"
          head="head1"
          hairBackground="longHairBackground"
          ear="ear3"
          eyeLine="eyeLine4"
          smileLine="smileLine4"
          miscLine="freckles1"
          facialHair="moustache1"
          eye="eye19"
          eyebrow="eyebrow20"
          mouth="straight"
          nose="small"
          hair="tallFade"
          skinColor="#bb876f"
          primaryColor="yellow"
          secondaryColor="red"
          accentColor="blue"
          headShaveColor="rgba(0,0,0,0)"
          faceShaveColor="rgba(0,0,0,0)"
          hairColor="#57330f"
        />
        {/* <FacesBody2Svg w="50" h="75" skinColor="#bb876f" />
        <FacesBody3Svg w="50" h="75" skinColor="#bb876f" />
        <FacesBody4Svg w="50" h="75" skinColor="#bb876f" />
        <FacesBody5Svg w="50" h="75" skinColor="#bb876f" /> */}
      </View>
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
