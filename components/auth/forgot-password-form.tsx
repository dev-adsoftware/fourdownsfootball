import React from 'react';
import validate from 'validate.js';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from '../core/buttons/button';
import {TextInputBox} from '../core/input/text-input-box';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {ErrorSnackbar} from '../core/snackbar/error';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  onSubmit: (username: string) => Promise<void>;
}

const Component: React.FC<Properties> = props => {
  const {onSubmit, theme} = props;

  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
    },
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
                value={username}
                onChangeText={(text: string) => setUsername(text)}
              />
            </TextInputBox>
          </FormRow>
          <FormRow>
            <Button
              text="Send Password Recovery Code"
              isLoading={isProcessing}
              disabled={
                validate({username}, {username: {email: true}}) !== undefined
              }
              onPress={async () => {
                try {
                  setIsProcessing(true);
                  await onSubmit(username);
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

export const ForgotPasswordForm = withTheme(Component);
