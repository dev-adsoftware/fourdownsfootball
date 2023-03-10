import React from 'react';
import {View} from '../primitives/view';

interface PermissionsScreenProps {}

export const PermissionsScreen: React.FC<PermissionsScreenProps> = () => {
  return (
    <>
      <View flex={1} w="full" debugColor="red" px={15} />
    </>
  );
};
