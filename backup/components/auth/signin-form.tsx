import React from 'react';
import validate from 'validate.js';
import {StyleSheet, TextInput, View} from 'react-native';
import {LinkButton} from '../core/buttons/link';
import {Button} from '../core/buttons/button';
import {TextInputBox} from '../core/input/text-input-box';
import {ErrorSnackbar} from '../core/snackbar/error';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  onForgot: () => Promise<void>;
  onSignUp: () => Promise<void>;
}

const Component: React.FC<Properties> = props => {
  const {onSubmit, onForgot, onSignUp, theme} = props;

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
    },
    forgotBox: {marginVertical: 20, alignItems: 'center'},
    textInput: {
      color: theme.colors.text,
    },
  });

  return (
    <>
      <View style={[styles.container]}>
        <Form>
          <FormRow>
            <TextInputBox>
              <TextInput
                style={[styles.textInput]}
                textAlign="left"
                autoCapitalize="none"
                returnKeyType="next"
                keyboardType="email-address"
                placeholder="Email Address"
                placeholderTextColor={theme.colors.placeholderText}
                value={username}
                onChangeText={(text: string) => setUsername(text)}
              />
            </TextInputBox>
          </FormRow>
          <FormRow>
            <TextInputBox>
              <TextInput
                style={[styles.textInput]}
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
            <Button
              text="Sign In"
              isLoading={isProcessing}
              disabled={
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
              }
              onPress={async () => {
                try {
                  setIsProcessing(true);
                  await onSubmit(username, password);
                } catch (e) {
                  if (e instanceof Error) {
                    setError(e.message);
                  }
                  setIsProcessing(false);
                }
              }}
            />
          </FormRow>
          {isProcessing ? (
            <></>
          ) : (
            <>
              <FormRow>
                <View style={[styles.forgotBox]}>
                  <LinkButton onPress={onForgot} text="Forgot Password?" />
                </View>
              </FormRow>
              <FormRow>
                <Button text="Sign Up" filled={false} onPress={onSignUp} />
              </FormRow>
            </>
          )}
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

export const SigninForm = withTheme(Component);
