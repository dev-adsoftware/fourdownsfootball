import React from 'react';
import { Auth as AWSAuth } from '@aws-amplify/auth';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { CognitoUser } from 'amazon-cognito-identity-js';
import { OwnerSummaryView } from '@dev-adsoftware/fourdownsfootball-dtos';
import { OwnerApi } from '../apis/owner.api';

const AuthContext = React.createContext<Auth | undefined>(undefined);

interface Auth {
  isLoading: boolean;
  owner: OwnerSummaryView;
  setOwner: React.Dispatch<React.SetStateAction<OwnerSummaryView>>;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [owner, setOwner] = React.useState(new OwnerSummaryView());

  React.useEffect(() => {
    const init = async () => {
      try {
        const cognitoUser: CognitoUser = (await AWSAuth.currentAuthenticatedUser()) as CognitoUser;
        const owner = await new OwnerApi().get(cognitoUser.getUsername());
        setOwner(owner);
        console.log(owner);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    if (isLoading) {
      init();
    }
  }, [isLoading, owner]);

  return (
    <AuthContext.Provider value={{ isLoading, owner, setOwner }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
