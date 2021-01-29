import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
// import { Auth } from 'aws-amplify';
// import { useAuth } from '../../providers/auth';

export default () => {
  // const auth = useAuth();

  return (
    <>
      <View style={styles.container}>
        <Button
          onPress={() => {
            console.log('press');
          }}>
          sign in
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
