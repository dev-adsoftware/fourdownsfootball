import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { useAuth } from '../../../providers/auth';
import { StackNavigationProp } from '@react-navigation/stack';

interface AuthSignInScreenProps {
  navigation: StackNavigationProp<
    {
      'Sign In': undefined;
      'Sign Up': undefined;
      'Forgot Password': undefined;
      Register: undefined;
    },
    'Sign In'
  >;
}

export default ({ navigation }: AuthSignInScreenProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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
    forgotPassword: {
      alignItems: 'flex-end',
    },
    forgot: {
      color: theme.colors.accent,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });

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
          <View style={theme.form.rowRight}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forgot Password')}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
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
                if (username.length === 0 || password.length === 0) {
                  setError('Username and password are required.');
                  console.log('bad');
                } else {
                  try {
                    await Auth.signIn(username, password);
                    auth.setUser({ username: username });
                  } catch (e) {
                    setError(e.message);
                  }
                }
              }}>
              Sign In
            </Button>
          </View>
          <View style={theme.form.rowCenter}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
