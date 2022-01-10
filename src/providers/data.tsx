import React from 'react';

const DataContext = React.createContext<Data | undefined>(undefined);

interface Data {}

type Properties = {
  children: React.ReactNode;
};

const DataProvider: React.FC<Properties> = ({children}) => {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};

const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
};

export {DataProvider, useData};
