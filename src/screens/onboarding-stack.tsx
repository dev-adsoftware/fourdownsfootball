import React from 'react';
import {StackPager, StackProvider} from '../components/navigation/stack-pager';
import {CreateNameScreen} from './create-name';

interface OnboardingStackProps {}

export const OnboardingStack: React.FC<OnboardingStackProps> = props => {
  return (
    <>
      <StackProvider>
        <StackPager initialPage={<CreateNameScreen />} />
      </StackProvider>
    </>
  );
};
