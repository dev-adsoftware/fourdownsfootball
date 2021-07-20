import React from 'react';
import 'react-native-get-random-values';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { Auth } from '@aws-amplify/auth';
import { useAuth } from '../../providers/auth';
import { useTheme } from '../../providers/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from './main';
import { OwnerApi } from '../../apis/owner.api';
import { OwnerAttributes } from '@dev-adsoftware/fourdownsfootball-dtos';

interface AuthSignInScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Sign In'>;
}

export default ({ navigation }: AuthSignInScreenProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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

  const ownerApi = new OwnerApi();

  return (
    <>
      <View style={theme.layout.container}>
        <View style={styles.form}>
          <View style={[theme.layout.form.row, theme.layout.center]}>
            <TextInput
              style={styles.input}
              label="Username"
              textAlign="left"
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
              textAlign="left"
              label="Password"
              mode="flat"
              autoCapitalize="none"
              returnKeyType="done"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <View style={[theme.layout.form.row, theme.layout.right]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forgot Password')}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
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
              loading={loading}
              onPress={async () => {
                if (username.length === 0 || password.length === 0) {
                  setError('Username and password are required.');
                  console.log('bad');
                } else {
                  try {
                    setLoading(true);
                    await Auth.signIn(username, password);
                    try {
                      const owner = await ownerApi.get(username);
                      auth.setOwner(owner);
                    } catch (e) {
                      if (e.response.status === 404) {
                        console.log('owner dne, creating new one');
                        auth.setOwner(
                          await ownerApi.create(
                            new OwnerAttributes().init({ username }),
                          ),
                        );
                      } else {
                        setError(e.message);
                        setLoading(false);
                      }
                    }
                  } catch (e) {
                    setError(e.message);
                    setLoading(false);
                  }
                }
              }}>
              Sign In
            </Button>
          </View>
          <View style={[theme.layout.form.row, theme.layout.center]}>
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
