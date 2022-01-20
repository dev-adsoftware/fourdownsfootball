import React from 'react';
import {Auth as AWSAuth} from 'aws-amplify';
import {Owner, OwnersService} from '../services/owners';
import {getStatusFromError} from '../services/types';

const AuthContext = React.createContext<Auth | undefined>(undefined);

interface Auth {
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (credentials: {username: string; password: string}) => Promise<void>;
  verifyConfirmationCode: (username: string, code: string) => Promise<void>;
  sendPasswordRecoveryCode: (username: string) => Promise<void>;
  resetPassword: (
    username: string,
    password: string,
    code: string,
  ) => Promise<void>;
  owner?: Owner;
}

type Properties = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Properties> = ({children}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [owner, setOwner] = React.useState<Owner>();

  const getOrCreateOwner = async (
    id: string,
    username: string,
  ): Promise<Owner> => {
    const service = new OwnersService();
    try {
      return await service.get(id);
    } catch (e) {
      if (getStatusFromError(e) === 404) {
        return await service.create({
          id,
          name: username,
          email: username,
        });
      }
      throw e;
    }
  };

  React.useEffect(() => {
    const init = async () => {
      try {
        const {username, attributes} = await AWSAuth.currentAuthenticatedUser();
        const fetchedOwner = await getOrCreateOwner(username, attributes.email);
        setOwner(fetchedOwner);
        setIsAuthenticated(true);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    init();
  }, []);

  const signIn = async (username: string, password: string) => {
    const user = await AWSAuth.signIn(username, password);
    const fetchedOwner = await getOrCreateOwner(user.username, username);
    setOwner(fetchedOwner);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await AWSAuth.signOut();
    setIsAuthenticated(false);
  };

  const signUp = async (credentials: {username: string; password: string}) => {
    await AWSAuth.signUp(credentials.username, credentials.password);
  };

  const verifyConfirmationCode = async (username: string, code: string) => {
    await AWSAuth.confirmSignUp(username, code);
  };

  const sendPasswordRecoveryCode = async (username: string) => {
    await AWSAuth.forgotPassword(username);
  };

  const resetPassword = async (
    username: string,
    password: string,
    code: string,
  ) => {
    await AWSAuth.forgotPasswordSubmit(username, code, password);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        signIn,
        signOut,
        signUp,
        verifyConfirmationCode,
        sendPasswordRecoveryCode,
        resetPassword,
        owner,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export {AuthProvider, useAuth};
