import React from 'react';
import {Auth as AWSAuth} from 'aws-amplify';
import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import {AppState, useGlobalState} from './global-state';

const client = axios.create();
client.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const session = await AWSAuth.currentSession();
  config.headers = {
    Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
    ...config.headers,
  };
  return config;
});

const AuthContext = React.createContext<Auth | undefined>(undefined);

interface User {
  username: string;
  email: string;
}
interface Auth {
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: {username: string; password: string}) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (credentials: {username: string; password: string}) => Promise<void>;
  verifyConfirmationCode: (confirmation: {
    username: string;
    code: string;
  }) => Promise<void>;
  sendPasswordRecoveryCode: (username: string) => Promise<void>;
  resetPassword: (
    username: string,
    password: string,
    code: string,
  ) => Promise<void>;
  user?: User;
  secureClient: AxiosInstance;
}

type Properties = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Properties> = ({children}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User>();

  const globalState = useGlobalState();

  React.useEffect(() => {
    const init = async () => {
      if (globalState.appState.value === AppState.LOADING) {
        try {
          // const session = await AWSAuth.currentSession();
          const {username, attributes} =
            await AWSAuth.currentAuthenticatedUser();
          setUser({username, email: attributes.email});
          setIsAuthenticated(true);
          globalState.appState.set(AppState.AUTHENTICATED);
        } catch (e) {
          console.log(e);
          globalState.appState.set(AppState.UNAUTHENTICATED);
        }
        setIsLoading(false);
      }
    };

    init();
  }, [globalState.appState]);

  const signIn = async (credentials: {username: string; password: string}) => {
    try {
      await AWSAuth.signIn(credentials.username, credentials.password);
      const {username, attributes} = await AWSAuth.currentAuthenticatedUser();
      setUser({username, email: attributes.email});
      setIsAuthenticated(true);
      globalState.appState.set(AppState.AUTHENTICATED);
    } catch (e) {
      const typedE = e as {code: string};
      if (typedE.code === 'UserNotFoundException') {
        throw Error('User with that email does not exist');
      } else if (typedE.code === 'NotAuthorizedException') {
        throw Error('Username or password is incorrect');
      }
      throw e;
    }
  };

  const signOut = async () => {
    await AWSAuth.signOut();
    setIsAuthenticated(false);
    globalState.appState.set(AppState.UNAUTHENTICATED);
  };

  const signUp = async (credentials: {username: string; password: string}) => {
    await AWSAuth.signUp(credentials.username, credentials.password);
  };

  const verifyConfirmationCode = async (confirmation: {
    username: string;
    code: string;
  }) => {
    await AWSAuth.confirmSignUp(confirmation.username, confirmation.code);
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
        secureClient: client,
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
