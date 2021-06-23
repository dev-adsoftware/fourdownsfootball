import React from 'react';
import { useAuth } from '../../providers/auth';
import AuthMain from '../auth/main';
import Splash from '../splash';
import Navigator from './navigator';

export default () => {
  const auth = useAuth();

  return (
    <>
      {auth.isLoading ? (
        <>
          <Splash />
        </>
      ) : auth.owner.id === undefined ? (
        <>
          <AuthMain />
        </>
      ) : (
        <>
          <Navigator />
        </>
      )}
    </>
  );
};
