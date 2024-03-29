import React from 'react';
import {Auth as AWSAuth} from 'aws-amplify';

const AuthContext = React.createContext<Auth | undefined>(undefined);

interface User {
  username: string;
  email: string;
}
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
  user?: User;
}

type Properties = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Properties> = ({children}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User>();

  // const checkOrCreateOwner = async (
  //   id: string,
  //   username: string,
  // ): Promise<void> => {
  //   const service = new OwnersService();
  //   try {
  //     await service.ownerExists(id);
  //     return;
  //   } catch (e) {
  //     if (getStatusFromError(e) === 404) {
  //       const ownerDto = new OwnerDto();
  //       ownerDto.id = id;
  //       ownerDto.name = username;
  //       ownerDto.email = username;
  //       await service.createOwner(ownerDto);
  //       return;
  //     }
  //     throw e;
  //   }
  // };

  React.useEffect(() => {
    const init = async () => {
      try {
        const {username, attributes} = await AWSAuth.currentAuthenticatedUser();
        setUser({username, email: attributes.email});
        setIsAuthenticated(true);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    init();
  }, []);

  const signIn = async (signInUsername: string, password: string) => {
    await AWSAuth.signIn(signInUsername, password);
    const {username, attributes} = await AWSAuth.currentAuthenticatedUser();
    setUser({username, email: attributes.email});
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
        user,
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
