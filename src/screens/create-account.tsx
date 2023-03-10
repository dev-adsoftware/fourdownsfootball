import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {Input} from '../components/inputs/input';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import validate from 'validate.js';
import {useAuth} from '../providers/auth';
import {VerifyConfirmationCodeScreen} from './verify-confirmation-code';
import {useStack} from '../components/navigation/stack-pager';

interface CreateAccountScreenProps {}

export const CreateAccountScreen: React.FC<
  CreateAccountScreenProps
> = _props => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();
  const stack = useStack();
  return (
    <>
      <View flex={1} w="full" bg="white" px={15}>
        <Text
          text="CREATE ACCOUNT"
          typeFace="klavikaCondensedMediumItalic"
          fontSize={20}
          py={20}
        />
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
        <View h={20} />
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
        <View h={20} />
        <Input
          label="Confirm Password"
          autoCapitalize="none"
          returnKeyType="done"
          hasError={error.length > 0}
          secureTextEntry
          textAlign="left"
          value={confirmPassword}
          onChangeText={(text: string) => {
            setError('');
            setConfirmPassword(text);
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
                onPress={async () => {
                  if (
                    validate(
                      {username, password, confirmPassword},
                      {
                        username: {
                          email: true,
                        },
                        password: {
                          presence: {allowEmpty: false},
                        },
                        confirmPassword: {
                          presence: {allowEmpty: false},
                          equality: 'password',
                        },
                      },
                    ) !== undefined
                  ) {
                    setError('Invalid username or password');
                  } else {
                    setIsProcessing(true);
                    try {
                      await auth.signUp({username, password});
                      stack.push({
                        component: (
                          <VerifyConfirmationCodeScreen username={username} />
                        ),
                      });
                      // navigate to OTP confirmation
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
