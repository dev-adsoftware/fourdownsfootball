import React from 'react';
import {StateProp} from '../types';

const GlobalStateContext = React.createContext<GlobalState | undefined>(
  undefined,
);

export enum AppState {
  LOADING,
  UNAUTHENTICATED,
  AUTHENTICATED,
  ONBOARDING,
  MAIN,
}

interface GlobalState {
  appState: StateProp<AppState>;
}

type Properties = {
  children: React.ReactNode;
};

const GlobalStateProvider: React.FC<Properties> = ({children}) => {
  const [appState, setAppState] = React.useState<AppState>(AppState.LOADING);

  React.useEffect(() => {
    if (appState === AppState.LOADING) {
      console.log('loading state');
    }
    if (appState === AppState.UNAUTHENTICATED) {
      console.log('unauth state');
    }
    if (appState === AppState.AUTHENTICATED) {
      console.log('auth state');
    }
    if (appState === AppState.ONBOARDING) {
      console.log('onboarding state');
      // setAppState(AppState.MAIN);
    }
    if (appState === AppState.MAIN) {
      console.log('main state');
    }
  }, [appState]);

  return (
    <GlobalStateContext.Provider
      value={{
        appState: {
          value: appState,
          set: setAppState,
        },
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = React.useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }

  return context;
};

export {GlobalStateProvider, useGlobalState};
