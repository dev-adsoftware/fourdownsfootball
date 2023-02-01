import React from 'react';
import {View} from '../components/primitives/view';

interface PaymentHistoryScreenProps {}

export const PaymentHistoryScreen: React.FC<
  PaymentHistoryScreenProps
> = props => {
  return (
    <>
      <View flex={1} w="full" debugColor="yellow" px={15} />
    </>
  );
};
