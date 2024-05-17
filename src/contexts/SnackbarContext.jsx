import { useState, useEffect, createContext, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

const defaultProps = {
  success: {
    duration: 3000,
    message: 'Successful action',
    alertProps: { severity: 'success' },
  },
  info: {
    duration: 3000,
    message: 'Something went wrong...',
    alertProps: { severity: 'info' },
  },
  warning: {
    duration: 3000,
    message: 'Something went wrong...',
    alertProps: { severity: 'warning' },
  },
  error: {
    duration: 3000,
    message: 'Something went wrong, please try again later',
    alertProps: { severity: 'error' },
  },
};

export function SnackbarContextProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [props, setProps] = useState(defaultProps.success);

  useEffect(() => {
    if (open === true) {
      setTimeout(() => {
        setOpen(false);
      }, props.duration);
    }
  }, [open]);

  const openSnackBar = ({ msg, customProps, type }) => {
    setMessage(msg ?? defaultProps[type].message);
    setOpen(true);
    setProps((ps) => ({ ...defaultProps[type], ...customProps }));
  };

  const successSnackbar = (msg, customProps) => {
    openSnackBar({ msg, customProps, type: 'success' });
  };

  const infoSnackbar = (msg, customProps) => {
    openSnackBar({ msg, customProps, type: 'info' });
  };

  const warningSnackbar = (msg, customProps) => {
    openSnackBar({ msg, customProps, type: 'warning' });
  };

  const errorSnackbar = (msg, customProps) => {
    openSnackBar({ msg, customProps, type: 'error' });
  };

  const { alertProps, ...snackbarProps } = props;
  return (
    <SnackbarContext.Provider
      value={{
        open,
        message,
        props,
        setMessage,
        setOpen,
        setProps,
        openSnackBar,
        successSnackbar,
        infoSnackbar,
        warningSnackbar,
        errorSnackbar,
      }}
    >
      {children}
      <Snackbar
        open={open}
        sx={{ minWidth: 240 }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        {...snackbarProps}
      >
        <Alert {...alertProps} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => useContext(SnackbarContext);
