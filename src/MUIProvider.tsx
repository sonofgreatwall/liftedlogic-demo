import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Define the shape of context
interface ThemeModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create context
const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

// Define light and dark themes
const lightTheme = createTheme({
  typography: {
    fontFamily: `'Inter Tight', sans-serif`,
  },
  palette: {
    mode: 'light',
    primary: { main: '#443e51' },
    secondary: { main: '#4c4c4c' },
    info: {main: '#231e2e'},
    background: { default: '#f3f3ff', paper: '#f9f9ff' },
    success: { main: '#706cff' },
    text: {
      primary: '#443e51',
      secondary: '#4c4c4c',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
  },
});

const darkTheme = createTheme({
  typography: {
    fontFamily: `'Inter Tight', sans-serif`,
  },
  palette: {
    mode: 'light',
    primary: { main: '#443e51' },
    secondary: { main: '#4c4c4c' },
    background: { default: '#f5f5f5', paper: '#fff' },
    success: { main: '#706cff' },
    text: {
      primary: '#443e51',
      secondary: '#4c4c4c'
    }
  },
});

interface ThemeModeProviderProps {
  children: ReactNode;
}

// Provider component
export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  // Detect system preference or use stored preference
  const getInitialMode = () => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return JSON.parse(stored);
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [darkMode, setDarkMode] = useState<boolean>(getInitialMode);

  // Persist darkMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Memoize theme object
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

// Custom hook for consuming the context
export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return context;
}
