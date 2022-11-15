import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ResetPasswordForm} from '../../components/auth/reset-password-form';
import {AuthStackParamList} from '../../stacks/auth';
import {useAuth} from '../../providers/auth';

type Properties = {
  route: RouteProp<AuthStackParamList, 'Reset Password'>;
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({route, navigation}) => {
  const auth = useAuth();
  return (
    <ResetPasswordForm
      username={route.params.username}
      onSubmit={async (username: string, password: string, code: string) => {
        await auth.resetPassword(username, password, code);
        navigation.navigate('Sign In');
      }}
    />
  );
};

export {Screen as ResetPasswordScreen};
