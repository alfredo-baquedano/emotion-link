import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState, useMemo, createContext, useContext } from 'react';
import getTheme from '../theme/theme';

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [colorMode, setColorMode] = useState('dark');

  const toggleColorMode = () =>
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme(getTheme(colorMode)), [colorMode]);

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        theme,
        toggleColorMode,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
