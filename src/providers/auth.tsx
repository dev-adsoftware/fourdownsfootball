import React from 'react';
import { Auth as AWSAuth } from '@aws-amplify/auth';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { CognitoUser } from 'amazon-cognito-identity-js';

const AuthContext = React.createContext<Auth | undefined>(undefined);

interface Auth {
  isLoading: boolean;
  user: { username: string };
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
    }>
  >;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState({ username: 'empty' });

  React.useEffect(() => {
    const init = async () => {
      try {
        const cognitoUser: CognitoUser = (await AWSAuth.currentAuthenticatedUser()) as CognitoUser;
        setUser({ username: cognitoUser.getUsername() });
        console.log(user);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    if (isLoading) {
      init();
    }
  }, [isLoading, user]);

  return (
    <AuthContext.Provider value={{ isLoading, user, setUser }}>
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
