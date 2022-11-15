import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import validate from 'validate.js';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {Button} from '../core/buttons/button';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {TextInputBox} from '../core/input/text-input-box';
import {ErrorSnackbar} from '../core/snackbar/error';

interface Properties extends InjectedThemeProps {
  username: string;
  onSubmit: (username: string, code: string) => Promise<void>;
}

const Component: React.FC<Properties> = props => {
  const {username, onSubmit, theme} = props;

  const [code, setCode] = React.useState('');
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
                placeholder="Confirmation Code"
                value={code}
                onChangeText={(text: string) => setCode(text)}
              />
            </TextInputBox>
          </FormRow>
          <FormRow>
            <Button
              text="Verify Confirmation Code"
              isLoading={isProcessing}
              disabled={
                validate({code}, {code: {presence: {allowEmpty: false}}}) !==
                undefined
              }
              onPress={async () => {
                try {
                  setIsProcessing(true);
                  await onSubmit(username, code);
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

export const SignupConfirmationForm = withTheme(Component);
