import React from 'react';
import validate from 'validate.js';
import {CircleButton} from '../../components/composites/circle-button';
import {Input} from '../../components/composites/input';
import {LogoSvg} from '../../components/composites/logo-svg';
import {Spinner} from '../../components/composites/spinner';
import {Container} from '../../components/primitives/container';
import {HStack} from '../../components/primitives/h-stack';
import {SafeBar} from '../../components/primitives/safe-bar';
import {Text} from '../../components/primitives/text';
import {VStack} from '../../components/primitives/v-stack';
import {VGutter} from '../../components/primitives/vgutter';
import {useAuth} from '../../providers/auth';
import {useData} from '../../providers/data';
import {OwnerDto} from '../../services/dtos';

interface OnboardingProfileScreenProperties {}

export const OnboardingProfileScreen: React.FC<
  OnboardingProfileScreenProperties
> = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();
  const data = useData();

  return (
    <>
      <SafeBar />
      <VStack justify="space-between" full>
        <Container styles={['p-x-md', 'w-full']}>
          <VStack>
            <VGutter size={50} />
            <HStack styles={['w-full']}>
              <LogoSvg size={50} />
              <Text
                styles={['c-gray', 't-title']}
                text="WELCOME TO 4D FOOTBALL!"
              />
            </HStack>
            <VGutter size={30} />
            <Text
              styles={['c-gray', 't-body', 'w-full']}
              text="Please take a moment to setup your profile."
            />
            <VGutter size={10} />
            <Container styles={['w-full']}>
              <Input
                label="First Name"
                autoCapitalize="words"
                returnKeyType="next"
                keyboardType="default"
                hasError={error.length > 0}
                value={firstName}
                onChangeText={(text: string) => {
                  setError('');
                  setFirstName(text);
                }}
              />
              <VGutter />
              <Input
                label="Last Name"
                autoCapitalize="words"
                returnKeyType="done"
                hasError={error.length > 0}
                textAlign="left"
                value={lastName}
                onChangeText={(text: string) => {
                  setError('');
                  setLastName(text);
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
                        {firstName, lastName},
                        {
                          firstName: {
                            presence: {allowEmpty: false},
                          },
                          lastName: {
                            presence: {allowEmpty: false},
                          },
                        },
                      ) !== undefined
                    ) {
                      setError('Invalid data');
                    } else {
                      console.log('creating owner', firstName, lastName);
                      setIsProcessing(true);
                      try {
                        const ownerDto = new OwnerDto().init({
                          id: auth.user?.username,
                          firstName,
                          lastName,
                          displayName: `${firstName} ${lastName}`,
                          email: auth.user?.email,
                          sequence: '0',
                          lastUpdateDate: new Date().toISOString(),
                          lastUpdatedBy: auth.user?.username,
                        });
                        console.log(ownerDto);
                        await data.services.owners.createOwner(ownerDto);
                      } catch (e) {
                        console.log(e);
                      }
                      setIsProcessing(false);
                    }
                  }}
                />
              )}
            </Container>
          </VStack>
        </Container>
      </VStack>
    </>
  );
};
