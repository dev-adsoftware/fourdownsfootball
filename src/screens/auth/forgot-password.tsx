import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ForgotPasswordForm} from '../../components/auth/forgot-password-form';
import {AuthStackParamList} from '../../stacks/auth';
import {useAuth} from '../../providers/auth';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  const auth = useAuth();
  return (
    <ForgotPasswordForm
      onSubmit={async (username: string) => {
        await auth.sendPasswordRecoveryCode(username);
        navigation.navigate('Reset Password', {username});
      }}
    />
  );
};

export {Screen as ForgotPasswordScreen};
