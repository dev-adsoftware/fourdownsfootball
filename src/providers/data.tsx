import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useEnv} from './env';
import {OwnerDto} from '../services/dtos';
import {OwnersService} from '../services/owners';
import {useAuth} from './auth';
// import {useNotification} from './notification';

const DataContext = React.createContext<Data | undefined>(undefined);

export interface WithRefresher {
  refresh: (showLoadingIndicator?: boolean) => Promise<void>;
}

export interface WithLoader {
  load: (id: string, showLoadingIndicator?: boolean) => Promise<void>;
}

export interface WithLocalState<L> {
  setLocalState: (item: L) => Promise<void>;
  localState: L;
}
export interface DataItemSegment<T> {
  item: T;
  isLoading: boolean;
}
export interface LocalGameState {
  lastPlayedSequence?: string;
  expectedSequence?: string;
}

export enum AppState {
  LOADING,
  UNAUTHENTICATED,
  ONBOARDING,
  MAIN,
}

// export type ActiveGame = DataItemSegment<GameDetailQueryResponseDto> &
//   WithLoader &
//   WithLocalState<LocalGameState>;
interface Data {
  appState: AppState;
  owner?: OwnerDto;
  clearAll: () => void;
  localStore: {
    get: <T>(key: string) => Promise<T | undefined>;
    set: <T>(key: string, value: T) => Promise<void>;
    clear: () => Promise<void>;
  };
  services: {
    owners: OwnersService;
  };
}

type Properties = {
  children: React.ReactNode;
};

const DataProvider: React.FC<Properties> = ({children}) => {
  const [appState, setAppState] = React.useState<AppState>(AppState.LOADING);
  const [owner, setOwner] = React.useState<OwnerDto>();

  const auth = useAuth();
  const env = useEnv();

  // const {addListener, removeListener} = useNotification();

  const getLocalData = React.useCallback(
    async <T,>(key: string): Promise<T | undefined> => {
      const jsonValue = await AsyncStorage.getItem(`@fourd:${key}`);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : undefined;
    },
    [],
  );

  const setLocalData = React.useCallback(
    async <T,>(key: string, value: T): Promise<void> => {
      await AsyncStorage.setItem(`@fourd:${key}`, JSON.stringify(value));
    },
    [],
  );

  const clearLocalData = React.useCallback(async (): Promise<void> => {
    const keys = (await AsyncStorage.getAllKeys()) as string[];
    await AsyncStorage.multiRemove(
      keys.filter(key => {
        return key.startsWith('@fourd');
      }),
    );
  }, []);

  const clearAll = React.useCallback(() => {}, []);

  const fetchOwner = React.useCallback(
    async (id: string) => {
      console.log('fetching owner', {id});
      const ownersService = new OwnersService(
        auth.secureClient,
        env.apiEndpoint,
      );
      if (!(await ownersService.ownerExists(id))) {
        setAppState(AppState.ONBOARDING);
      } else {
        const fetchedOwner = await ownersService.getOwner(id);
        setOwner(fetchedOwner);
        setAppState(AppState.MAIN);
      }
    },
    [auth.secureClient, env.apiEndpoint],
  );

  React.useEffect(() => {
    if (appState === AppState.LOADING) {
      console.log('loading state');
    }
    if (appState === AppState.UNAUTHENTICATED) {
      console.log('unauth state');
    }
    if (appState === AppState.ONBOARDING) {
      console.log('onboarding state');
    }
    if (appState === AppState.MAIN) {
      console.log('main state');
    }
  }, [appState]);

  React.useEffect(() => {
    if (auth.user) {
      fetchOwner(auth.user.username);
    }
  }, [auth.user, fetchOwner]);

  React.useEffect(() => {
    console.log('mounting data provider');
    // addListener({
    //   eventType: 'games',
    //   id: 'data-provider-games-listener',
    //   callback: () => {
    //     console.log('owner dashboard refresher');
    //     refreshOwnerDashboard();
    //   },
    // });
    // addListener({
    //   eventType: 'game-requests',
    //   id: 'data-provider-game-requests-listener',
    //   callback: () => {
    //     console.log('owner dashboard refresher');
    //     refreshOwnerDashboard();
    //   },
    // });
    // addListener({
    //   eventType: 'game-invites',
    //   id: 'data-provider-game-invites-listener',
    //   callback: () => {
    //     console.log('owner dashboard refresher');
    //     refreshOwnerDashboard();
    //   },
    // });

    return () => {
      // removeListener('data-provider-games-listener');
      // removeListener('data-provider-game-requests-listener');
      // removeListener('data-provider-game-invites-listener');
    };
    // }, [addListener, removeListener, refreshOwnerDashboard]);
  }, []);

  return (
    <DataContext.Provider
      value={{
        appState,
        owner,
        clearAll,
        localStore: {
          get: getLocalData,
          set: setLocalData,
          clear: clearLocalData,
        },
        services: {
          owners: new OwnersService(auth.secureClient, env.apiEndpoint),
        },
      }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
};

export {DataProvider, useData};
