import React from 'react';
import {version} from '../../package.json';

interface Env {
  version?: string;
  environment: string;
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
  apiEndpoint: string;
}

const EnvContext = React.createContext<Env | undefined>(undefined);

type EnvProviderProps = {
  children: React.ReactNode;
  initialEnv: Env;
};

function EnvProvider({children, initialEnv}: EnvProviderProps) {
  const [env] = React.useState({version, ...initialEnv});

  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
}

function useEnv() {
  const context = React.useContext(EnvContext);
  if (context === undefined) {
    throw new Error('useEnv must be used within a EnvProvider');
  }

  return context;
}

export {EnvProvider, useEnv};
