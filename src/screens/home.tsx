import React from 'react';
import {CircleAbbrAvatar} from '../components/avatars/circle-abbr-avatar';
import {IconButton} from '../components/buttons/icon-button';
import {SafeBar} from '../components/primitives/safe-bar';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {useData} from '../providers/data';
import {Pager} from '../components/navigation/pager';
import {FadeInScreen} from '../components/navigation/fade-in-screen';

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
  const [isSettingsScreenVisible, setIsSettingsScreenVisible] =
    React.useState(false);

  const data = useData();
  return (
    <>
      <SafeBar />
      <View flex={1} w="full" bg="oddLayerSurface">
        <View row bg="white" h={75}>
          <View w={75} alignItems="center" justifyContent="center">
            <CircleAbbrAvatar
              text={data.owner?.firstName.slice(0, 1).toUpperCase() || '?'}
            />
          </View>
          <View flex={1} justifyContent="center" alignItems="flex-start">
            <Text
              text="WELCOME,"
              typeFace="klavikaCondensedBold"
              fontSize="callout"
            />
            <Text
              text={`${data.owner?.firstName.toUpperCase()}!`}
              typeFace="klavikaCondensedBold"
              fontSize="title1"
              lineHeight={28}
            />
          </View>
          <View w={75} pt={20} alignItems="center" justifyContent="flex-start">
            <IconButton
              onPress={() => {
                setIsSettingsScreenVisible(true);
              }}
              icon="cog"
              color="primaryText"
            />
          </View>
        </View>
        <Pager
          pages={[
            {name: 'NEWS', component: <BaseScreen />},
            {name: 'SCORES', component: <TeamsScreen />},
            {name: 'STANDINGS', component: <BaseScreen />},
            {name: 'RANKINGS', component: <TeamsScreen />},
            {name: 'TRANSFER MARKET', component: <BaseScreen />},
          ]}
        />
      </View>
      <FadeInScreen
        isVisible={isSettingsScreenVisible}
        onClose={() => {
          setIsSettingsScreenVisible(false);
        }}>
        <View h={200} w={200} debugColor="purple" />
      </FadeInScreen>
    </>
  );
};