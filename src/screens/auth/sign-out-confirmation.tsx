import React from 'react';
import {ConfirmActionForm} from '../../components/core/forms/confirm-action-form';
import {useAuth} from '../../providers/auth';

type Properties = {};

const Screen: React.FC<Properties> = ({}) => {
  const auth = useAuth();

  return (
    <ConfirmActionForm
      text="Are you sure you want to sign out?"
      onConfirm={async () => {
        await auth.signOut();
      }}
    />
  );
};

export {Screen as SignOutConfirmationScreen};
