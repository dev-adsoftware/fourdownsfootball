import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {Link} from '../components/buttons/link';
import {Input} from '../components/inputs/input';
import {SafeBar} from '../components/primitives/safe-bar';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {LogoSvg} from '../components/svg/logo-svg';
import {useAuth} from '../providers/auth';
import validate from 'validate.js';
import {SAFE_AREA_PADDING_BOTTOM} from '../constants/safe-area';
import {CreateAccountScreen} from './create-account';
import {useStack} from '../components/navigation/stack-pager';

interface SignInScreenProperties {}

export const SignInScreen: React.FC<SignInScreenProperties> = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();
  const stack = useStack();

  return (
    <>
      <SafeBar />
      <View justifyContent="space-between" bg="white">
        <View p={20}>
          <View
            row
            flex="none"
            justifyContent="flex-start"
            alignItems="center"
            mt={10}
            py={35}>
            <LogoSvg size={50} />
            <View pl={10}>
              <Text
                typeFace="klavikaCondensedBoldItalic"
                fontSize="title1"
                color="primaryText"
                text="SIGN IN"
              />
            </View>
          </View>
          <View flex="none" alignItems="center">
            <View flex="none" alignItems="center" py={10}>
              <Text color="black" text="New to 4-Downs Football?" />
            </View>
            <Link
              text="CREATE AN ACCOUNT"
              color="primary"
              onPress={() => {
                stack.push({component: <CreateAccountScreen />});
              }}
            />
          </View>
          <View flex="none" h={180} justifyContent="space-between" pt={30}>
            <Input
              label="Email"
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              hasError={error.length > 0}
              value={username}
              onChangeText={(text: string) => {
                setError('');
                setUsername(text);
              }}
            />
            <Input
              label="Password"
              autoCapitalize="none"
              returnKeyType="done"
              hasError={error.length > 0}
              secureTextEntry
              textAlign="left"
              value={password}
              onChangeText={(text: string) => {
                setError('');
                setPassword(text);
              }}
            />
          </View>
          <View flex="none" pl={3} pt={3} h={20}>
            {error ? (
              <Text fontSize="footnote" text={error} color="error" />
            ) : (
              <></>
            )}
          </View>
          <View>
            <View row justifyContent="flex-end">
              {isProcessing ? (
                <Spinner />
              ) : (
                <CircleIconButton
                  icon="arrow-right"
                  onPress={async () => {
                    if (
                      validate(
                        {username, password},
                        {
                          username: {
                            email: true,
                          },
                          password: {
                            presence: {allowEmpty: false},
                          },
                        },
                      ) !== undefined
                    ) {
                      setError('Invalid username or password');
                    } else {
                      setIsProcessing(true);
                      try {
                        await auth.signIn({username, password});
                      } catch (e) {
                        // console.error(e);
                        setError(`${e}`);
                        setIsProcessing(false);
                      }
                    }
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <View
          flex="none"
          row
          justifyContent="center"
          pb={SAFE_AREA_PADDING_BOTTOM}>
          <Link
            text="FORGOT PASSWORD"
            onPress={() => {
              console.log('forgot password');
            }}
          />
        </View>
      </View>
    </>
  );
};
