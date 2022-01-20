import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ConfirmActionForm} from '../../components/core/forms/confirm-action-form';
import {useAuth} from '../../providers/auth';
import {SettingsStackParamList} from '../../stacks/settings';

type Properties = {
  navigation: NativeStackNavigationProp<SettingsStackParamList>;
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
