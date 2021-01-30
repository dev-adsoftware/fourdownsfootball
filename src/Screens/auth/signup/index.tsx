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
  const [error, setError] = React.useState('');

  const auth = useAuth();
  const theme = useTheme();

  const styles = StyleSheet.create({
    input: {
      width: 340,
    },
  });

  return (
    <>
      <View style={theme.container}>
        <TextInput
          style={styles.input}
          label="Username"
          mode="flat"
          autoCapitalize="none"
          returnKeyType="next"
          value={username}
          onChangeText={(text: string) => setUsername(text)}
        />
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
        <HelperText type="error" visible={error.length > 0}>
          Error: {error}
        </HelperText>
        <Button
          mode="contained"
          onPress={async () => {
            if (username.length === 0 || password.length === 0) {
              console.log('me');
              setError('Username and password are required.');
            } else {
              try {
                await Auth.signIn(username, password);
                auth.setUser({ username: username });
                navigation.reset({ index: 0, routes: [{ name: 'Sign In' }] });
              } catch (e) {
                console.error(e);
                setError(e.message);
              }
            }
          }}>
          Sign Up
        </Button>
      </View>
    </>
  );
};
