import React from 'react';
import { TeamSummaryView } from '@dev-adsoftware/fourdownsfootball-dtos';
import { TeamApi } from '../apis/team.api';
import { useAuth } from './auth';

const DataContext = React.createContext<Data | undefined>(undefined);

interface Data {
  teams: {
    data: TeamSummaryView[];
    refresh: () => Promise<void>;
  };
}

type DataProviderProps = {
  children: React.ReactNode;
};

function DataProvider({ children }: DataProviderProps) {
  const [teams, setTeams] = React.useState([] as TeamSummaryView[]);

  const auth = useAuth();

  const refreshTeams = React.useCallback(async () => {
    const teamApi = new TeamApi();
    const teamsFetched = await teamApi.list(auth.owner.id);
    console.log(teamsFetched);
    setTeams(teamsFetched.items);
  }, [auth.owner.id]);

  React.useEffect(() => {
    refreshTeams();
  }, [refreshTeams]);

  return (
    <DataContext.Provider
      value={{ teams: { data: teams, refresh: refreshTeams } }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
}

export { DataProvider, useData };
