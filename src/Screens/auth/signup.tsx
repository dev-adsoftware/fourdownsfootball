import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { Auth } from '@aws-amplify/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from './main';
import { useTheme } from '../../providers/theme';

interface AuthSignUpScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Sign Up'>;
}

export default ({ navigation }: AuthSignUpScreenProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

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
      <View style={theme.layout.container}>
        <View style={styles.form}>
          <View style={[theme.layout.form.row, theme.layout.center]}>
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
          <View style={[theme.layout.form.row, theme.layout.center]}>
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
          <View style={[theme.layout.form.row, theme.layout.center]}>
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
              <View style={[theme.layout.form.row, theme.layout.center]}>
                <HelperText type="error">Error: {error}</HelperText>
              </View>
            </>
          ) : (
            <></>
          )}
          <View style={[theme.layout.form.row, theme.layout.center]}>
            <Button
              mode="contained"
              onPress={async () => {
                if (username.length === 0) {
                  setError('Username is required.');
                } else if (password.length === 0) {
                  setError('Password is required.');
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
                    navigation.navigate('Confirm', { username });
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
