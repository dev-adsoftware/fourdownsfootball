import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {AuthStackParamList} from '../../stacks/auth';
import {SignupConfirmationForm} from '../../components/auth/signup-confirmation-form';
import {useAuth} from '../../providers/auth';

type Properties = {
  route: RouteProp<AuthStackParamList, 'Sign Up Confirmation'>;
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({route, navigation}) => {
  const auth = useAuth();
  return (
    <SignupConfirmationForm
      username={route.params.username}
      onSubmit={async (username: string, code: string) => {
        await auth.verifyConfirmationCode(username, code);
        navigation.navigate('Sign In');
      }}
    />
  );
};

export {Screen as SignUpConfirmationScreen};
