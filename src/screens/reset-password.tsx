import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ResetPasswordForm} from '../components/reset-password-form';
import {AuthStackParamList} from '../stacks/auth';

type Properties = {
  route: RouteProp<AuthStackParamList, 'Reset Password'>;
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Reset Password'>;
};

const Screen: React.FC<Properties> = ({route, navigation}) => {
  return (
    <ResetPasswordForm
      username={route.params.username}
      onPressResetPassword={() => {
        navigation.navigate('Sign In');
      }}
    />
  );
};

export {Screen as ResetPasswordScreen};
