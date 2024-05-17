import { Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

const Loading = ({ text, sx }) => {
  return (
    <Box
      sx={{
        ...{
          height: '100%',
          width: '100%',
          minHeight: 250,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        },
        ...sx,
      }}
    >
      <CircularProgress />
      {text ?? 'Cargando...'}
    </Box>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
  sx: PropTypes.object,
};

export default Loading;
