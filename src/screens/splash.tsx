import React from 'react';
import validate from 'validate.js';
import {Container} from '../components/primitives/container';
import {Link} from '../components/composites/link';
import {Input} from '../components/composites/input';
import {Text} from '../components/primitives/text';
import {VGutter} from '../components/primitives/vgutter';
import {VStack} from '../components/primitives/v-stack';
import {CircleButton} from '../components/composites/circle-button';
import {Spinner} from '../components/composites/spinner';
import {SafeBar} from '../components/primitives/safe-bar';
import {LogoSvg} from '../components/composites/logo-svg';
import {HStack} from '../components/primitives/h-stack';
import {useAuth} from '../providers/auth';

interface SplashScreenProperties {}

export const SplashScreen: React.FC<SplashScreenProperties> = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();

  return (
    <>
      <SafeBar />
      <VStack justify="space-between" full>
        <Container styles={['p-x-md', 'w-full']}>
          <VStack>
            <VGutter size={50} />
            <HStack styles={['w-full']}>
              <LogoSvg size={50} />
              <Text styles={['c-gray', 't-title']} text="SIGN IN" />
            </HStack>
            <VGutter size={30} />
            <Text styles={['t-body']} text="New to 4-Downs Football?" />
            <Link
              text="CREATE AN ACCOUNT"
              onPress={() => {
                console.log('create an account');
              }}
            />
            <VGutter size={30} />
            <Container styles={['w-full']}>
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
            {error ? (
              <Container styles={['w-full', 'p-left-xs']}>
                <Text text={error} styles={['t-body', 'c-error']} />
              </Container>
            ) : (
              <VGutter size={20} />
            )}
            <Container styles={['w-full', 'a-end']}>
              {isProcessing ? (
                <Spinner variant="primary" size="lg" />
              ) : (
                <CircleButton
                  icon="arrow-right"
                  variant="primary-contrast"
                  size="lg"
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
                      }
                      setIsProcessing(false);
                    }
                  }}
                />
              )}
            </Container>
          </VStack>
        </Container>
        <Container styles={['w-full', 'a-center', 'p-y-xl']}>
          <Link
            variant="gray"
            text="FORGOT PASSWORD"
            onPress={() => {
              console.log('forgot password');
            }}
          />
        </Container>
      </VStack>
    </>
  );
};
