import React from 'react';
import {useWindowDimensions} from 'react-native';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {useStack} from '../components/navigation/stack-pager';
import {SafeBar} from '../primitives/safe-bar';
import {ScrollView} from '../primitives/scroll-view';
import {View} from '../primitives/view';
import {useData} from '../providers/data';
import {useEnv} from '../providers/env';
import {AppState, useGlobalState} from '../providers/global-state';
import {SettingsHeader} from '../components/headers/settings-header';
import {SettingsSectionList} from '../components/lists/settings-section-list';
import {SignOutLink} from '../components/buttons/sign-out-link';
import {Copyright} from '../components/footers/copyright';
import {FloatingCircleCloseButton} from '../components/buttons/floating-circle-close-button';

interface SettingsScreenProps {}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const {version} = useEnv();
  const data = useData();
  const stack = useStack();
  const {reset: resetFadeInScreen} = useFadeInScreen();
  const globalState = useGlobalState();

  const {height} = useWindowDimensions();

  React.useEffect(() => {
    if (globalState.appState.value === AppState.UNAUTHENTICATED) {
      resetFadeInScreen();
    }
  }, [globalState.appState.value, resetFadeInScreen]);

  return (
    <>
      <SafeBar bg="white" />
      <ScrollView w="full" flex={1} bg="white">
        <SettingsHeader
          firstName={data.owner!.firstName}
          lastName={data.owner!.lastName}
        />
        <View mt={20} px={20}>
          <SettingsSectionList sectionName="MY ACCOUNT" />
        </View>
        <View alignItems="center" py={30}>
          <SignOutLink />
        </View>
        <View
          w="full"
          alignItems="center"
          pt={10}
          bg="oddLayerSurface"
          h={height}>
          <Copyright version={version!} />
        </View>
      </ScrollView>
      <FloatingCircleCloseButton
        onPress={() => {
          stack.pop();
        }}
      />
    </>
  );
};
