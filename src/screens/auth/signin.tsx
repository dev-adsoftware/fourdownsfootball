import React from 'react';
import validate from 'validate.js';
import {Link} from '../../components/composites/link';
import {Input} from '../../components/composites/input';
import {Text} from '../../components/primitives/text';
import {VGutter} from '../../components/primitives/vgutter';
import {VStack} from '../../components/primitives/v-stack';
import {CircleButton} from '../../components/composites/circle-button';
import {Spinner} from '../../components/composites/spinner';
import {SafeBar} from '../../components/primitives/safe-bar';
import {LogoSvg} from '../../components/composites/logo-svg';
import {HStack} from '../../components/primitives/h-stack';
import {useAuth} from '../../providers/auth';
import {Rect} from '../../components/primitives/rect';
import {Container} from '../../components/primitives/container';

interface AuthSignInScreenProperties {}

export const AuthSignInScreen: React.FC<AuthSignInScreenProperties> = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();

  return (
    <>
      <SafeBar />
      <VStack justifyContent="space-between" full>
        <Rect p="xl">
          <VStack>
            <VGutter size="2xl" />
            <Container>
              <HStack justifyContent="flex-start">
                <LogoSvg size={50} />
                <Rect pl="lg">
                  <Text
                    typeFace="klavikaCondensedBoldItalic"
                    fontSize="xl"
                    color="grayLink"
                    text="SIGN IN"
                  />
                </Rect>
              </HStack>
            </Container>
            <VGutter size="2xl" />
            <Text color="black" text="New to 4-Downs Football?" />
            <VGutter size="xs" />
            <Link
              text="CREATE AN ACCOUNT"
              onPress={() => {
                console.log('create an account');
              }}
            />
            <VGutter />
            <Container w="full">
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
              <VGutter />
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
            </Container>
            <Rect pl="xs" pt="xs" h={20}>
              {error ? (
                <Text fontSize="2xs" text={error} color="error" />
              ) : (
                <></>
              )}
            </Rect>
            <Container>
              <HStack justifyContent="flex-end">
                {isProcessing ? (
                  <Spinner />
                ) : (
                  <CircleButton
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
                          await auth.signIn(username, password);
                        } catch (e) {
                          // console.error(e);
                          setError(`${e}`);
                          setIsProcessing(false);
                        }
                      }
                    }}
                  />
                )}
              </HStack>
            </Container>
          </VStack>
        </Rect>
        <Rect pb="safe" w="full">
          <HStack justifyContent="center">
            <Link
              text="FORGOT PASSWORD"
              onPress={() => {
                console.log('forgot password');
              }}
            />
          </HStack>
        </Rect>
      </VStack>
    </>
  );
};
