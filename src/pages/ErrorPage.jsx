import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ErrorPage = () => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant='h4' gutterBottom>
        ERROR
      </Typography>
      <Typography variant='body1' gutterBottom>
        An unexpected error has occurred.
      </Typography>
      <Button variant='text' color='primary' component={RouterLink} to='/'>
        Return to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
