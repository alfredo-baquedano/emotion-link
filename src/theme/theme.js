import { lime } from '@mui/material/colors';

const baseTheme = {
  primary: {
    main: lime[50],
  },
};

const getTheme = (mode) => ({
  palette: {
    ...baseTheme,
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
        }
      : {
          // palette values for dark mode
        }),
  },
});

export default getTheme;
