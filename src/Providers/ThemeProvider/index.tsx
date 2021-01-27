import React from 'react';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

const ThemeContext = React.createContext<Theme | undefined>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
  initialTheme: Theme;
};

function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme] = React.useState(initialTheme);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
