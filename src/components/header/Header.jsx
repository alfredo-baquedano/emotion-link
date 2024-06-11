import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Star, Tune } from '@mui/icons-material';
import ToggleColorMode from './ToggleColorMode';

const Header = ({ onFilterClick, onMissionClick }) => {
  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar variant='dense'>
        <Typography
          sx={{ marginRight: 'auto' }}
          variant='h6'
          color='inherit'
          component='div'
        >
          Emotional Link
        </Typography>

        <Tooltip describeChild title='Open filters menu' arrow placement='top'>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='Filters menu'
            sx={{ mr: 2 }}
            onClick={onFilterClick}
          >
            <Tune />
          </IconButton>
        </Tooltip>
        <Tooltip describeChild title='Open missions menu' arrow placement='top'>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='Missions menu'
            sx={{ mr: 2 }}
            onClick={onMissionClick}
          >
            <Star />
          </IconButton>
        </Tooltip>
        <Tooltip describeChild title='Toggle color mode' arrow placement='top'>
          <ToggleColorMode />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
