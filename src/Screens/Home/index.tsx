import { API } from 'aws-amplify';
import React from 'react';
import { View, Button } from 'react-native';
import { UserTimesIcon } from '../../components/icons';
import { useAuth } from '../../providers/auth';

export interface HomeScreenProps {}

export default () => {
  const auth = useAuth();
  console.log(auth.user.username);

  API.get('fourdowns', '/games/4', {}).then((value: any) => {
    console.log(value);
  });
  return (
    <View>
      <UserTimesIcon color="red" size="2x" />
      <Button
        title="New Game"
        onPress={async () => {
          console.log('start a new game');
        }}
      />
    </View>
  );
};
