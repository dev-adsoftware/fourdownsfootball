import React from 'react';
import validate from 'validate.js';
import {StyleSheet, TextInput, View} from 'react-native';
import {useAuth} from '../../providers/auth';
import {LinkButton} from '../core/buttons/link';
import {Button} from '../core/buttons/button';
import {TextInputBox} from '../core/input/text-input-box';
import {ErrorSnackbar} from '../core/snackbar/error';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {useTheme} from '../../providers/theme';
import {TextInputColorStyle} from '../../styles/text-input-color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../stacks/auth';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Component: React.FC<Properties> = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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
    forgotBox: {marginVertical: 20, alignItems: 'center'},
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
                placeholderTextColor={theme.colors.placeholderText}
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
            <Button
              text="Sign In"
              isLoading={isProcessing}
              disabled={validate(
                {username, password},
                {
                  username: {
                    email: true,
                  },
                  password: {
                    presence: {allowEmpty: false},
                  },
                },
              )}
              onPress={async () => {
                try {
                  setIsProcessing(true);
                  await auth.signIn(username, password);
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
                  <LinkButton
                    onPress={() => navigation.navigate('Forgot Password')}
                    text="Forgot Password?"
                  />
                </View>
              </FormRow>
              <FormRow>
                <Button
                  text="Sign Up"
                  filled={false}
                  onPress={() => navigation.navigate('Sign Up')}
                />
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

export {Component as SigninForm};
