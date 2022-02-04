import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import validate from 'validate.js';
import {useAuth} from '../../providers/auth';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {TextInputBox} from '../core/input/text-input-box';
import {ErrorSnackbar} from '../core/snackbar/error';
import {TextInputColorStyle} from '../../styles/text-input-color';
import {useTheme} from '../../providers/theme';
import {Button} from '../core/buttons/button';
import {AuthStackParamList} from '../../stacks/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Component: React.FC<Properties> = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
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
            <TextInputBox>
              <TextInput
                style={[TextInputColorStyle(theme)]}
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
                style={[TextInputColorStyle(theme)]}
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
              text="Sign Up"
              isLoading={isProcessing}
              disabled={validate(
                {username, password, password2},
                {
                  username: {
                    email: true,
                  },
                  password: {
                    presence: {allowEmpty: false},
                  },
                  password2: {
                    presence: {allowEmpty: false},
                    equality: 'password',
                  },
                },
              )}
              onPress={async () => {
                try {
                  setIsProcessing(true);
                  await auth.signUp({username, password});
                  navigation.navigate('Sign Up Confirmation', {username});
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

export {Component as SignupForm};
