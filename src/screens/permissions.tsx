import React from 'react';
import {SafeBar} from '../components/primitives/safe-bar';
import {View} from '../components/primitives/view';

interface PermissionsScreenProps {}

export const PermissionsScreen: React.FC<PermissionsScreenProps> = props => {
  return (
    <>
      <View flex={1} w="full" debugColor="red" px={15} />
    </>
  );
};
