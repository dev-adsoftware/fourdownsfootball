import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
import { useAuth } from '../../Providers/AuthProvider';

// export interface LoginScreenProps { username: string }

// export default ({ navigation, route }: StackScreenProps<{ Login: LoginScreenProps }, 'Login'>) => {
export default () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { state, login } = useAuth();

  return (
    <View>
      <Text>{state.user?.username}</Text>
      <Text>{state.errorMessage}</Text>
      <Text>{state.status}</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign in"
        // onPress={() => dispatch({ type: 'login', payload: username })}
        onPress={async () => {
          login(username, password);
        }}
      />
    </View>
  );
};
