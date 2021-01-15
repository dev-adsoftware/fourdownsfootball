import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
}

type Status = 'initializing' | 'validating' | 'success' | 'error';
type State = {
  status: Status;
  errorMessage?: string;
  user?: User;
};

type Action =
  | { type: 'init' }
  | { type: 'validate' }
  | { type: 'complete'; payload: { user: User } }
  | { type: 'throw'; payload: { errorMessage: string } }
  | { type: 'clear' };
type Dispatch = (action: Action) => void;
const AuthContext = React.createContext<{
  state: State | undefined;
  dispatch: Dispatch | undefined;
}>({ state: undefined, dispatch: undefined });

const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'init': {
      return { ...state, status: 'initializing' as Status };
    }
    case 'validate': {
      return { ...state, status: 'validating' as Status };
    }
    case 'complete': {
      return {
        ...state,
        status: 'success' as Status,
        user: { ...action.payload.user },
      };
    }
    case 'throw': {
      return {
        ...state,
        status: 'error' as Status,
        errorMessage: action.payload.errorMessage,
      };
    }
    case 'clear': {
      const currentState = { ...state, status: 'error' as Status };
      delete currentState.user;
      delete currentState.errorMessage;
      return currentState;
    }
    default: {
      throw new Error(`Unhandled action type ${(action as any).type}`);
    }
  }
};

type AuthProviderProps = { children: React.ReactNode };

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    status: 'initializing',
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const init = async () => {
    dispatch({ type: 'init' });
    const user = await AsyncStorage.getItem('@user');
    if (user) {
      dispatch({ type: 'complete', payload: JSON.parse(user) });
    } else {
      dispatch({ type: 'throw', payload: { errorMessage: 'no user' } });
    }
  };

  const login = async (username: string, password: string) => {
    dispatch({ type: 'validate' });
    // Do something here to validate after some time
    setTimeout(async () => {
      console.log('in login timeout');
      if (username === 'kyle' && password === 'test') {
        dispatch({
          type: 'complete',
          payload: { user: { id: '1', username: username } },
        });
        await AsyncStorage.setItem(
          '@user',
          JSON.stringify({ id: '1', username: username }),
        );
      } else {
        dispatch({
          type: 'throw',
          payload: { errorMessage: 'invalid username or password' },
        });
      }
    }, 2000);
  };

  return { state, dispatch, init, login };
};

export { AuthProvider, useAuth };
