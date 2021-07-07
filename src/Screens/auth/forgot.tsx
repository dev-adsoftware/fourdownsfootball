import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { Auth } from '@aws-amplify/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from './main';
import { useTheme } from '../../providers/theme';

interface AuthForgotScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Forgot Password'>;
}

export default ({ navigation }: AuthForgotScreenProps) => {
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState('');

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
      <View style={theme.layout.container}>
        <View style={styles.form}>
          <View style={[theme.layout.form.row, theme.layout.center]}>
            <TextInput
              style={styles.input}
              textAlign="left"
              label="Username"
              mode="flat"
              autoCapitalize="none"
              returnKeyType="next"
              value={username}
              onChangeText={(text: string) => setUsername(text)}
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
                } else {
                  try {
                    await Auth.forgotPassword(username);
                    navigation.navigate('Reset Password', { username });
                  } catch (e) {
                    setError(e.message);
                  }
                }
              }}>
              Send Password Recovery Code
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
