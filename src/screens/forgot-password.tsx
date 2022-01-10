import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ForgotPasswordForm} from '../components/forgot-password-form';
import {AuthStackParamList} from '../stacks/auth';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Forgot Password'>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  return (
    <ForgotPasswordForm
      onSendPasswordRecoveryCode={(username: string) => {
        navigation.navigate('Reset Password', {username});
      }}
    />
  );
};

export {Screen as ForgotPasswordScreen};
