import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Validator} from '../../globals/validator';
import {useAuth} from '../../providers/auth';
import {Button} from '../core/buttons/button';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {TextInputBox} from '../core/input/text-input-box';
import {ErrorSnackbar} from '../core/snackbar/error';

type Properties = {
  username: string;
  onPressResetPassword: () => void;
};

const Component: React.FC<Properties> = ({username, onPressResetPassword}) => {
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
    },
  });

  return (
    <>
      <View style={[styles.container]}>
        <Form>
          <FormRow>
            <TextInputBox>
              <TextInput
                textAlign="left"
                autoCapitalize="none"
                returnKeyType="next"
                placeholder="Confirmation Code"
                value={code}
                onChangeText={(text: string) => setCode(text)}
              />
            </TextInputBox>
          </FormRow>
          <FormRow>
            <TextInputBox>
              <TextInput
                textAlign="left"
                autoCapitalize="none"
                returnKeyType="done"
                placeholder="Password"
                value={password}
                onChangeText={(text: string) => setPassword(text)}
                secureTextEntry
              />
            </TextInputBox>
          </FormRow>
          <FormRow>
            <TextInputBox>
              <TextInput
                textAlign="left"
                autoCapitalize="none"
                returnKeyType="done"
                placeholder="Verify Password"
                value={password2}
                onChangeText={(text: string) => setPassword2(text)}
                secureTextEntry
              />
            </TextInputBox>
          </FormRow>
          <FormRow>
            <Button
              text="Reset Password"
              isLoading={isProcessing}
              disabled={Validator.validate(
                {code, password, password2},
                {
                  code: {presence: {allowEmpty: false}},
                  password: {presence: {allowEmpty: false}},
                  password2: {equality: 'password'},
                },
              )}
              onPress={async () => {
                try {
                  setIsProcessing(true);
                  await auth.resetPassword(username, password, code);
                  onPressResetPassword();
                } catch (e) {
                  if (e instanceof Error) {
                    setError(e.message);
                  }
                  setIsProcessing(false);
                }
              }}
            />
          </FormRow>
        </Form>
      </View>
      <ErrorSnackbar
        text={error}
        visible={error.length > 0}
        onDismiss={() => {
          setError('');
        }}
      />
    </>
  );
};

export {Component as ResetPasswordForm};
