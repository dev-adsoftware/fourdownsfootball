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
  username: string;
  onPressConfirm: () => void;
};

const Component: React.FC<Properties> = ({username, onPressConfirm}) => {
  const [code, setCode] = React.useState('');
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
    verifyConfirmationCodeButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      width: '100%',
      alignItems: 'center',
      padding: 10,
    },
    verifyConfirmationCodeButtonText: {color: 'white', fontWeight: 'bold'},
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
              placeholder="Confirmation Code"
              value={code}
              onChangeText={(text: string) => setCode(text)}
            />
          </View>
        </View>
        <View style={[styles.row]}>
          {isProcessing ? (
            <ActivityIndicator
              style={[styles.verifyConfirmationCodeButton]}
              color="white"
            />
          ) : (
            <TouchableOpacity
              style={[styles.verifyConfirmationCodeButton]}
              onPress={async () => {
                if (code.length === 0) {
                  setError('Confirmation code is required');
                } else {
                  try {
                    setIsProcessing(true);
                    await auth.verifyConfirmationCode(username, code);
                    onPressConfirm();
                  } catch (e) {
                    if (e instanceof Error) {
                      setError(e.message);
                    }
                    setIsProcessing(false);
                  }
                }
              }}>
              <Text style={[styles.verifyConfirmationCodeButtonText]}>
                Verify Confirmation Code
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

export {Component as SignupConfirmationForm};
