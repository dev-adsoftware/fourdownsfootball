import React from 'react';
import {StackPager, StackProvider} from '../components/navigation/stack-pager';
import {SignInScreen} from './signin';

interface AuthStackProps {}

export const AuthStack: React.FC<AuthStackProps> = props => {
  return (
    <>
      <StackProvider>
        <StackPager initialPage={<SignInScreen />} />
      </StackProvider>
    </>
  );
};
