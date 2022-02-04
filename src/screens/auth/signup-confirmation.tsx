import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {AuthStackParamList} from '../../stacks/auth';
import {SignupConfirmationForm} from '../../components/auth/signup-confirmation-form';

type Properties = {
  route: RouteProp<AuthStackParamList, 'Sign Up Confirmation'>;
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({route, navigation}) => {
  return (
    <SignupConfirmationForm
      username={route.params.username}
      navigation={navigation}
    />
  );
};

export {Screen as SignUpConfirmationScreen};
