import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { useAuth } from '../../providers/auth';
import { PrimaryButton, SecondaryButton } from '../../components/buttons';
import { Input } from '../../components/inputs';

export default () => {
  const auth = useAuth();

  return (
    <>
      <View style={styles.container}>
        <Input />
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
        />
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
