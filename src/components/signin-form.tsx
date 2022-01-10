import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../providers/auth';
import {useTheme} from '../providers/theme';

type Properties = {
  onPressForgotPassword: () => void;
  onPressSignUp: () => void;
};

const Component: React.FC<Properties> = ({
  onPressForgotPassword,
  onPressSignUp,
}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const auth = useAuth();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
    },
    form: {
      width: '100%',
      marginVertical: 10,
    },
    row: {marginVertical: 5},
    input: {
      width: '100%',
    },
    inputBox: {
      borderWidth: 1,
      borderColor: '#aaa',
      padding: 10,
      borderRadius: 10,
    },
    signInButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      width: '100%',
      alignItems: 'center',
      padding: 10,
    },
    signInButtonText: {color: 'white', fontWeight: 'bold'},
    forgotBox: {marginVertical: 20, alignItems: 'center'},
    forgotBoxText: {color: theme.colors.accent, fontSize: 12},
    signUpButton: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 20,
      width: '100%',
      alignItems: 'center',
      padding: 10,
    },
    signUpButtonText: {color: theme.colors.primary},
    errorText: {
      color: theme.colors.error,
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 20,
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={[styles.form]}>
        <View style={[styles.row]}>
          <View style={[styles.inputBox]}>
            <TextInput
              style={[styles.input]}
              textAlign="left"
              autoCapitalize="none"
              returnKeyType="next"
              placeholder="Email Address"
              value={username}
              onChangeText={(text: string) => setUsername(text)}
            />
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.inputBox]}>
            <TextInput
              style={styles.input}
              textAlign="left"
              autoCapitalize="none"
              returnKeyType="done"
              placeholder="Password"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              secureTextEntry
            />
          </View>
        </View>
        <View style={[styles.row]}>
          {isProcessing ? (
            <ActivityIndicator style={[styles.signInButton]} color="white" />
          ) : (
            <TouchableOpacity
              style={[styles.signInButton]}
              onPress={async () => {
                if (username.length === 0 || password.length === 0) {
                  setError('Username and password are required.');
                } else {
                  try {
                    setIsProcessing(true);
                    await auth.signIn(username, password);
                  } catch (e) {
                    if (e instanceof Error) {
                      setError(e.message);
                    }
                    setIsProcessing(false);
                  }
                }
              }}>
              <Text style={[styles.signInButtonText]}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>
        {error.length > 0 ? (
          <>
            <View style={[styles.row]}>
              <Text style={[styles.errorText]}>Error: {error}</Text>
            </View>
          </>
        ) : (
          <></>
        )}
        <View style={[styles.row]}>
          <TouchableOpacity
            style={[styles.forgotBox]}
            onPress={onPressForgotPassword}>
            <Text style={[styles.forgotBoxText]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.row]}>
          <TouchableOpacity
            style={[styles.signUpButton]}
            onPress={onPressSignUp}>
            <Text style={[styles.signUpButtonText]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export {Component as SigninForm};
