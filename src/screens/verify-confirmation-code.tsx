import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {Input} from '../components/inputs/input';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import validate from 'validate.js';
import {useAuth} from '../providers/auth';
import {useStack} from '../components/navigation/stack-pager';

interface VerifyConfirmationCodeScreenProps {
  username: string;
}

export const VerifyConfirmationCodeScreen: React.FC<
  VerifyConfirmationCodeScreenProps
> = props => {
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();
  const stack = useStack();
  return (
    <>
      <View flex={1} w="full" bg="white" px={15}>
        <Text
          text="VERIFY CONFIRMATION CODE"
          typeFace="klavikaCondensedMediumItalic"
          fontSize="title2"
          py={20}
        />
        <Input
          label="Verification Code"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="email-address"
          hasError={error.length > 0}
          value={code}
          onChangeText={(text: string) => {
            setError('');
            setCode(text);
          }}
        />
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
                      {code},
                      {code: {presence: {allowEmpty: false}}},
                    ) !== undefined
                  ) {
                    setError('Invalid username or password');
                  } else {
                    setIsProcessing(true);
                    try {
                      await auth.verifyConfirmationCode({
                        username: props.username,
                        code,
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
