import { API } from 'aws-amplify';
import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../Providers/AuthProvider';

export interface HomeScreenProps {}

export default () => {
  const auth = useAuth();
  console.log(auth.user.username);

  API.get('fourdowns', '/games/4', {}).then((value: any) => {
    console.log(value);
  });
  return (
    <View>
      <Button
        title="New Game"
        onPress={async () => {
          console.log('start a new game');
        }}
      />
    </View>
  );
};
