import React from 'react';
import validate from 'validate.js';
import {StyleSheet, TextInput, View} from 'react-native';
import {useAuth} from '../../providers/auth';
import {Button} from '../core/buttons/button';
import {TextInputBox} from '../core/input/text-input-box';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {ErrorSnackbar} from '../core/snackbar/error';
import {TextInputColorStyle} from '../../styles/text-input-color';
import {useTheme} from '../../providers/theme';
import {AuthStackParamList} from '../../stacks/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Component: React.FC<Properties> = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();
  const theme = useTheme();

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
                style={[TextInputColorStyle(theme)]}
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
              disabled={validate({username}, {username: {email: true}})}
              onPress={async () => {
                try {
                  setIsProcessing(true);
                  await auth.sendPasswordRecoveryCode(username);
                  navigation.navigate('Reset Password', {username});
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

export {Component as ForgotPasswordForm};
