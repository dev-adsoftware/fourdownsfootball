import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SigninForm} from '../../components/auth/signin-form';
import {AuthStackParamList} from '../../stacks/auth';
import {useAuth} from '../../providers/auth';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  const auth = useAuth();
  return (
    <SigninForm
      onSubmit={async (username: string, password: string) => {
        await auth.signIn(username, password);
      }}
      onForgot={async () => navigation.navigate('Forgot Password')}
      onSignUp={async () => navigation.navigate('Sign Up')}
    />
  );
};

export {Screen as SignInScreen};
