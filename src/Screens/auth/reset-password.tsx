import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { useTheme } from '../../providers/theme';
import { AuthStackParamList } from './main';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface AuthResetPasswordScreenProps {
  route: RouteProp<AuthStackParamList, 'Reset Password'>;
  navigation: StackNavigationProp<AuthStackParamList, 'Reset Password'>;
}

export default ({ route, navigation }: AuthResetPasswordScreenProps) => {
  const { username } = route.params;

  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
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
              label="Confirmation Code"
              mode="flat"
              autoCapitalize="none"
              returnKeyType="next"
              value={code}
              onChangeText={(text: string) => setCode(text)}
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
                if (password.length === 0 || code.length === 0) {
                  setError('Confirmation code and password are required.');
                } else {
                  try {
                    await Auth.forgotPasswordSubmit(username, code, password);
                    navigation.navigate('Sign In');
                  } catch (e) {
                    setError(e.message);
                  }
                }
              }}>
              Reset Password
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
