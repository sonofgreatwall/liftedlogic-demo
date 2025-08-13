import React, { createContext, useContext } from 'react';
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
    fontFamily: `'Inter Tight'`,
  },
  palette: {
    mode: 'light',
    primary: { main: '#443e51' },
    secondary: { main: '#4c4c4c' },
    info: { main: '#231e2e' },
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

interface ThemeModeProviderProps {
  children: ReactNode;
}

// Provider component
export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
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
