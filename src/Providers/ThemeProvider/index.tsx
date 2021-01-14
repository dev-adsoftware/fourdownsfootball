import React from 'react';

type Paragraph = {
  color: string;
  fontFamily: string;
  fontSize: number;
  lineHeight?: number;
};
type Button = {
  color: string;
  backgroundColor?: string;
  fontFamily: string;
  fontSize: number;
  height: number;
};

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  typography: {
    specialParagraph: Paragraph;
    paragraph1: Paragraph;
    paragraph2: Paragraph;
    heading1: Paragraph;
    heading2: Paragraph;
    heading3: Paragraph;
    heading4: Paragraph;
    heading5: Paragraph;
    heading6: Paragraph;
  };
  buttons: {
    primary: Button;
    hover: Button;
    secondary: Button;
  };
};
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
