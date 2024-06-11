import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const NotFound = () => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant='h4' gutterBottom>
        404 ERROR
      </Typography>
      <Typography variant='body1' gutterBottom>
        The page you are looking for does not exist
      </Typography>
      <Button variant='text' color='primary' component={RouterLink} to='/'>
        Return to home
      </Button>
    </Box>
  );
};

export default NotFound;
