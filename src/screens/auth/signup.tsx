import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../stacks/auth';
import {SignupForm} from '../../components/auth/signup-form';
import {useAuth} from '../../providers/auth';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  const auth = useAuth();
  return (
    <SignupForm
      onSubmit={async (username: string, password: string) => {
        await auth.signUp({username, password});
        navigation.navigate('Sign Up Confirmation', {username});
      }}
    />
  );
};

export {Screen as SignUpScreen};
