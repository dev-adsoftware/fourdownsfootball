import React from 'react';
import {View} from '../primitives/view';

interface BillingInformationScreenProps {}

export const BillingInformationScreen: React.FC<
  BillingInformationScreenProps
> = _props => {
  return (
    <>
      <View flex={1} w="full" debugColor="green" px={15} />
    </>
  );
};
