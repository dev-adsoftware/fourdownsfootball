import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { useAuth } from '../../providers/auth';

export default () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const auth = useAuth();

  return (
    <>
      <View style={styles.container}>
        <TextInput
          label="Username"
          mode="flat"
          value={username}
          onChangeText={(text: string) => setUsername(text)}
        />
        <TextInput
          label="Password"
          mode="flat"
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
              setError('Username and password are required.');
            } else {
              try {
                await Auth.signIn(username, password);
                auth.setUser({ username: username });
              } catch (e) {
                console.error(e);
                setError(e.message);
              }
            }
          }}>
          Sign In
        </Button>
        {/* <Input />
        <PrimaryButton
          text="Sign in"
          onPress={async () => {
            try {
              await Auth.signIn('kgorges', 'Fourdowns!3058');
              auth.setUser({ username: 'kgorges' });
            } catch (e) {
              console.error(e);
            }
          }}
        />
        <SecondaryButton
          text="Sign up"
          onPress={async () => {
            try {
              await Auth.signIn('kgorges', 'Fourdowns!3058');
              auth.setUser({ username: 'kgorges' });
            } catch (e) {
              console.error(e);
            }
          }}
        /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
