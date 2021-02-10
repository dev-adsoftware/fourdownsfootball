import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput, useTheme } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { useAuth } from '../../../providers/auth';
/* eslint-disable-next-line */
import { StackNavigationProp } from '@react-navigation/stack';

interface AuthSignUpScreenProps {
  navigation: StackNavigationProp<{ 'Sign In': undefined }>;
}

export default ({ navigation }: AuthSignUpScreenProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
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

  const emailValidator = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <>
      <View style={theme.container}>
        <View style={styles.form}>
          <View style={theme.form.rowCenter}>
            <TextInput
              style={styles.input}
              label="Username"
              mode="flat"
              autoCapitalize="none"
              returnKeyType="next"
              value={username}
              onChangeText={(text: string) => setUsername(text)}
            />
          </View>
          <View style={theme.form.rowCenter}>
            <TextInput
              style={styles.input}
              label="Password"
              mode="flat"
              autoCapitalize="none"
              returnKeyType="done"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <View style={theme.form.rowCenter}>
            <TextInput
              style={styles.input}
              label="E-Mail Address"
              mode="flat"
              autoCapitalize="none"
              returnKeyType="done"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
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
                } else if (password.length === 0) {
                  setError('Password are required.');
                } else if (email.length === 0) {
                  setError('E-mail address is required.');
                } else if (!emailValidator(email)) {
                  setError('E-mail address must be valid.');
                } else {
                  try {
                    await Auth.signUp({
                      username,
                      password,
                      attributes: { email },
                    });
                    auth.setUser({ username: username });
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Sign In' }],
                    });
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
