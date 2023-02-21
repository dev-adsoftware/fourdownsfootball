import React from 'react';
import {StackPager, StackProvider} from '../components/navigation/stack-pager';
import {SettingsScreen} from './settings';

interface SettingsStackProps {}

export const SettingsStack: React.FC<SettingsStackProps> = () => {
  return (
    <>
      <StackProvider>
        <StackPager initialPage={<SettingsScreen />} />
      </StackProvider>
    </>
  );
};
