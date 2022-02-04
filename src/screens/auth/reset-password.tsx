import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ResetPasswordForm} from '../../components/auth/reset-password-form';
import {AuthStackParamList} from '../../stacks/auth';

type Properties = {
  route: RouteProp<AuthStackParamList, 'Reset Password'>;
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({route, navigation}) => {
  return (
    <ResetPasswordForm
      username={route.params.username}
      navigation={navigation}
    />
  );
};

export {Screen as ResetPasswordScreen};
