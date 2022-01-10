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
  onSendPasswordRecoveryCode: (username: string) => void;
};

const Component: React.FC<Properties> = ({onSendPasswordRecoveryCode}) => {
  const [username, setUsername] = React.useState('');
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
    signUpButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      width: '100%',
      alignItems: 'center',
      padding: 10,
    },
    signUpButtonText: {color: 'white', fontWeight: 'bold'},
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
          {isProcessing ? (
            <ActivityIndicator style={[styles.signUpButton]} color="white" />
          ) : (
            <TouchableOpacity
              style={[styles.signUpButton]}
              onPress={async () => {
                if (username.length === 0) {
                  setError('Username is required.');
                } else {
                  try {
                    setIsProcessing(true);
                    await auth.sendPasswordRecoveryCode(username);
                    onSendPasswordRecoveryCode(username);
                  } catch (e) {
                    if (e instanceof Error) {
                      setError(e.message);
                    }
                    setIsProcessing(false);
                  }
                }
              }}>
              <Text style={[styles.signUpButtonText]}>
                Send Password Recovery Code
              </Text>
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
      </View>
    </View>
  );
};

export {Component as ForgotPasswordForm};
