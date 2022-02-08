import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Validator} from '../../globals/validator';
import {useAuth} from '../../providers/auth';
import {AuthStackParamList} from '../../stacks/auth';
import {Button} from '../core/buttons/button';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {TextInputBox} from '../core/input/text-input-box';
import {ErrorSnackbar} from '../core/snackbar/error';

type Properties = {
  username: string;
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Component: React.FC<Properties> = ({username, navigation}) => {
  const [code, setCode] = React.useState('');
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
            <Button
              text="Verify Confirmation Code"
              isLoading={isProcessing}
              disabled={Validator.validate(
                {code},
                {code: {presence: {allowEmpty: false}}},
              )}
              onPress={async () => {
                try {
                  setIsProcessing(true);
                  await auth.verifyConfirmationCode(username, code);
                  navigation.navigate('Sign In');
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

export {Component as SignupConfirmationForm};