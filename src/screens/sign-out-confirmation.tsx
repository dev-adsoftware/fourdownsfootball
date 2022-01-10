import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ConfirmActionForm} from '../components/confirm-action-form';
import {useAuth} from '../providers/auth';
import {ProfileStackParamList} from '../stacks/profile';

type Properties = {
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  const auth = useAuth();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <></>,
    });
  }, [navigation]);

  return (
    <ConfirmActionForm
      text="Are you sure you want to sign out?"
      onConfirm={async () => {
        await auth.signOut();
      }}
    />
  );
};

export {Screen as SignOutConfirmationScreen};
