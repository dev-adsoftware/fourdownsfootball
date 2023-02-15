import React from 'react';
import {useWindowDimensions} from 'react-native';
import App from '../../App';
import {Spinner} from '../components/activity-indicators/spinner';
import {CircleAbbrAvatar} from '../components/avatars/circle-abbr-avatar';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {Link} from '../components/buttons/link';
import {TextButton} from '../components/buttons/text-button';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {useStack} from '../components/navigation/stack-pager';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {SafeBar} from '../components/primitives/safe-bar';
import {ScrollView} from '../components/primitives/scroll-view';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {LogoSvg} from '../components/svg/logo-svg';
import {SAFE_AREA_PADDING_BOTTOM} from '../constants/safe-area';
import {useAuth} from '../providers/auth';
import {useData} from '../providers/data';
import {useEnv} from '../providers/env';
import {AppState, useGlobalState} from '../providers/global-state';
import {BillingInformationScreen} from './billing-information';
import {ConfirmActionScreen} from './confirm-action';
import {PersonalInformationScreen} from './personal-information';

interface SettingsScreenProps {}

export const SettingsScreen: React.FC<SettingsScreenProps> = props => {
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const {version} = useEnv();
  const data = useData();
  const auth = useAuth();
  const stack = useStack();
  const fadeInScreen = useFadeInScreen();
  const globalState = useGlobalState();

  const {height} = useWindowDimensions();

  React.useEffect(() => {
    if (isSigningOut) {
      auth.signOut();

      fadeInScreen.push({
        component: (
          <View flex={1} alignItems="center" justifyContent="center">
            <View>
              <Spinner />
            </View>
          </View>
        ),
      });
    }
  }, [isSigningOut]);

  React.useEffect(() => {
    if (globalState.appState.value === AppState.UNAUTHENTICATED) {
      fadeInScreen.reset();
    }
  }, [globalState.appState.value]);

  return (
    <>
      <SafeBar bg="white" />
      <ScrollView w="full" flex={1} bg="white">
        <View row>
          <View h={100} w={100} alignItems="center" justifyContent="center">
            <CircleAbbrAvatar
              text={data.owner?.firstName.slice(0, 1).toUpperCase() || '?'}
              size={75}
            />
          </View>
          <View py={10}>
            <Text
              text={`${data.owner?.firstName.toUpperCase()} ${data.owner?.lastName.toUpperCase()}`}
              fontSize="title1"
              typeFace="klavikaCondensedMedium"
            />
            <View row>
              <View w={20} pt={2} alignItems="center">
                <LogoSvg size={20} />
              </View>
              <View pl={5} justifyContent="flex-start">
                <Text
                  text="BETA TESTER MEMBERSHIP"
                  fontSize="subhead"
                  typeFace="klavikaCondensedMedium"
                />
                <Text
                  text="Unlimited Games / Billing Period"
                  fontSize="footnote"
                  typeFace="sourceSansProRegular"
                />
              </View>
            </View>
            <View row mt={5}>
              <View w={20} pt={3} alignItems="center">
                <Icon name="football-ball" size="3xs" color="primary" />
              </View>
              <View pl={5} justifyContent="flex-start">
                <Text
                  text="ANDALE FALCONS (I.1)"
                  fontSize="subhead"
                  typeFace="klavikaCondensedMedium"
                />
              </View>
            </View>
          </View>
        </View>
        <View px={20}>
          <TextButton text="BUY GAMES" onPress={() => {}} />
        </View>
        <View mt={20} px={20}>
          <Text
            text="MY ACCOUNT"
            typeFace="klavikaCondensedMedium"
            fontSize="headline"
          />

          <View h={1} my={2} bg="separator" />
          <Pressable
            onPress={() => {
              stack.push({
                component: <PersonalInformationScreen />,
              });
            }}>
            <View row alignItems="center" justifyContent="space-between">
              <Text
                py={10}
                text="Personal Information"
                typeFace="sourceSansProRegular"
                fontSize="body"
              />
              <Icon name="chevron-right" color="grayButton" size="2xs" />
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              stack.push({
                component: <BillingInformationScreen />,
              });
            }}>
            <View row alignItems="center" justifyContent="space-between">
              <Text
                py={10}
                text="Billing Information"
                typeFace="sourceSansProRegular"
                fontSize="body"
              />
              <Icon name="chevron-right" color="grayButton" size="2xs" />
            </View>
          </Pressable>

          <View row alignItems="center" justifyContent="space-between">
            <Text
              py={10}
              text="Payment History"
              typeFace="sourceSansProRegular"
              fontSize="body"
            />
            <Icon name="chevron-right" color="grayButton" size="2xs" />
          </View>

          <View row alignItems="center" justifyContent="space-between">
            <Text
              py={10}
              text="Permissions"
              typeFace="sourceSansProRegular"
              fontSize="body"
            />
            <Icon name="chevron-right" color="grayButton" size="2xs" />
          </View>

          <View row alignItems="center" justifyContent="space-between">
            <Text
              py={10}
              text="Delete My Account"
              typeFace="sourceSansProRegular"
              fontSize="body"
            />
            <Icon name="chevron-right" color="grayButton" size="2xs" />
          </View>
        </View>
        <View alignItems="center" py={30}>
          <Link
            text="SIGN OUT"
            onPress={() => {
              fadeInScreen.push({
                component: (
                  <ConfirmActionScreen
                    icon="sign-out-alt"
                    questionText={`Are you sure you want\nto sign out?`}
                    buttonText="Sign out"
                    onConfirm={async () => {
                      setIsSigningOut(true);
                    }}
                  />
                ),
                // <View flex={1} alignItems="center" justifyContent="center">
                //   <View>
                //     <View
                //       borderRadius={8}
                //       bg="white"
                //       alignItems="center"
                //       justifyContent="space-between">
                //       <View px={30} py={20} alignItems="center">
                //         <View position="absolute" top={10} right={10}>
                //           <CircleIconButton
                //             icon="times"
                //             bg="lightGrayButton"
                //             color="black"
                //             size={30}
                //             onPress={() => {
                //               fadeInScreen.pop();
                //             }}
                //           />
                //         </View>
                //         <Icon name="sign-out-alt" size="3xl" color="black" />
                //         <Text
                //           mt={10}
                //           text={`Are you sure you want\nto sign out?`}
                //           textAlign="center"
                //           color="black"
                //           typeFace="sourceSansProSemibold"
                //           fontSize="headline"
                //         />
                //       </View>
                //       <Pressable
                //         w="full"
                //         onPress={async () => {
                //           await auth.signOut();
                //           fadeInScreen.pop();
                //         }}>
                //         <View
                //           bg="success"
                //           py={12}
                //           w="full"
                //           borderBottomRadius={8}
                //           alignItems="center">
                //           <Text
                //             text="Sign out"
                //             color="white"
                //             typeFace="sourceSansProSemibold"
                //             fontSize="headline"
                //           />
                //         </View>
                //       </Pressable>
                //     </View>
                //   </View>
                // </View>
                // ),
              });
            }}
          />
        </View>
        <View
          w="full"
          flex={1}
          alignItems="center"
          pt={10}
          bg="oddLayerSurface">
          <Text
            text={`Version: ${version}`}
            fontSize="footnote"
            typeFace="sourceSansProRegular"
          />
          <Text
            px={50}
            pt={10}
            mb={height / 3}
            textAlign="center"
            text={`Copyright 2023 American Dreams Software, LLC.\nAll rights reserved.`}
            fontSize="footnote"
            typeFace="sourceSansProRegular"
          />
        </View>
      </ScrollView>
      <View
        position="absolute"
        bottom={SAFE_AREA_PADDING_BOTTOM}
        right={20}
        w={75}
        h={75}
        alignItems="center"
        justifyContent="center">
        <CircleIconButton
          icon="times"
          onPress={e => {
            // props.onClose && props.onClose(e);
            stack.pop();
          }}
          size={60}
        />
      </View>
    </>
  );
};
