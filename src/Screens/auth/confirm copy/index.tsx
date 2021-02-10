import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput, useTheme } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { useAuth } from '../../../providers/auth';
import { RouteProp } from '@react-navigation/native';

interface AuthConfirmScreenProps {
  route: RouteProp<{ Confirm: { username: string } }, 'Confirm'>;
}

export default ({ /*navigation,*/ route }: AuthConfirmScreenProps) => {
  const { username } = route.params;
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');

  const auth = useAuth();
  const theme = useTheme();

  const styles = StyleSheet.create({
    form: {
      width: 340,
    },
    input: {
      width: '100%',
    },
  });

  return (
    <>
      <View style={theme.container}>
        <View style={styles.form}>
          <View style={theme.form.rowCenter}>
            <TextInput
              style={styles.input}
              label="Confirmation code"
              mode="flat"
              autoCapitalize="none"
              returnKeyType="done"
              value={code}
              onChangeText={(text: string) => setCode(text)}
            />
          </View>
          {error.length > 0 ? (
            <>
              <View style={theme.form.rowCenter}>
                <HelperText type="error">Error: {error}</HelperText>
              </View>
            </>
          ) : (
            <></>
          )}
          <View style={theme.form.rowCenter}>
            <Button
              mode="contained"
              onPress={async () => {
                if (username.length === 0) {
                  setError('Username is required.');
                } else if (code.length === 0) {
                  setError('Code is required.');
                } else {
                  try {
                    await Auth.confirmSignUp(username, code);
                    auth.setUser({ username });
                  } catch (e) {
                    setError(e.message);
                  }
                }
              }}>
              Sign Up
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
