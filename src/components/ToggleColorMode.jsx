import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../contexts/ThemeContext';

export default function ToggleColorMode({ showText = false }) {
  const { theme, toggleColorMode } = useTheme();

  return (
    <Box
      sx={{
        width: showText ? 200 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showText &&
        `Modox ${
          {
            light: 'Claro',
            dark: 'Oscuro',
          }[theme.palette.mode]
        }`}
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color='inherit'>
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}
