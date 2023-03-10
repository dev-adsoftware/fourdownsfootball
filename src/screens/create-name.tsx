import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {Input} from '../components/inputs/input';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import validate from 'validate.js';
import {useAuth} from '../providers/auth';
import {useData} from '../providers/data';
import {OwnerDto} from '../services/dtos';
import {SafeBar} from '../primitives/safe-bar';
import {AppState, useGlobalState} from '../providers/global-state';

interface CreateNameScreenProps {}

export const CreateNameScreen: React.FC<CreateNameScreenProps> = _props => {
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();
  const data = useData();
  const globalState = useGlobalState();
  return (
    <>
      <SafeBar />
      <View flex={1} w="full" bg="white" px={15}>
        <Text
          text="PROFILE NAME"
          typeFace="klavikaCondensedMediumItalic"
          fontSize={20}
          py={20}
        />
        <Input
          label="First Name"
          autoCapitalize="words"
          returnKeyType="next"
          hasError={error.length > 0}
          value={firstname}
          onChangeText={(text: string) => {
            setError('');
            setFirstname(text);
          }}
        />
        <View h={20} />
        <Input
          label="Last Name"
          autoCapitalize="none"
          returnKeyType="done"
          hasError={error.length > 0}
          textAlign="left"
          value={lastname}
          onChangeText={(text: string) => {
            setError('');
            setLastname(text);
          }}
        />
        <View flex="none" pl={3} pt={3} h={20}>
          {error ? <Text fontSize={14} text={error} color="error" /> : <></>}
        </View>
        <View>
          <View row justifyContent="flex-end">
            {isProcessing ? (
              <Spinner />
            ) : (
              <CircleIconButton
                icon="arrow-right"
                color="white"
                size={12}
                onPress={async () => {
                  if (
                    validate(
                      {firstname, lastname},
                      {
                        firstname: {
                          presence: {allowEmpty: false},
                        },
                        lastname: {
                          presence: {allowEmpty: false},
                        },
                      },
                    ) !== undefined
                  ) {
                    setError('Invalid name');
                  } else {
                    setIsProcessing(true);
                    try {
                      await data.services.owners.createOwner(
                        new OwnerDto().init({
                          id: auth.user?.username,
                          sequence: '0',
                          lastUpdateDate: new Date().toISOString(),
                          lastUpdatedBy: 'app',
                          email: auth.user?.email,
                          firstName: firstname,
                          lastName: lastname,
                          displayName: `${firstname} ${lastname}`,
                        }),
                      );
                      globalState.appState.set(AppState.MAIN);
                    } catch (e) {
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
    </>
  );
};
