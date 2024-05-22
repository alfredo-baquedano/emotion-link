import { blueGrey } from '@mui/material/colors';

const baseTheme = {
  primary: {
    main: blueGrey[50],
  },
  secondary: {
    main: blueGrey[50],
  },
};

const getTheme = (mode) => ({
  palette: {
    ...baseTheme,
    mode,
    ...(mode === 'light'
      ? {
        primary: {
          main: blueGrey[900],
        },
        secondary: {
          main: blueGrey[900],
        },
        // palette values for light mode
      }
      : {
        // palette values for dark mode
      }),
  },
});

export default getTheme;
