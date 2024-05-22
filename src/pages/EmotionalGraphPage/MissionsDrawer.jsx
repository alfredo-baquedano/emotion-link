import { React, useState } from 'react';
import {
  Button,
  Drawer,
  Divider,
  Typography,
  Box,
  TextField,
  Toolbar,
  Checkbox,
  List,
  ListItem,
} from '@mui/material';
import MissionsList from './MissionsList';
import useUser from '../../contexts/UserContext';

export default function MissionsDrawer({ open, onClose }) {
  const { user, gainExp, getLevel } = useUser();

  const [isLvl2Blocked, setisLvl2Blocked] = useState(true);
  const handleLock2 = () => {
    setisLvl2Blocked(!isLvl2Blocked);
  };

  const DrawerList = (
    <Box
      sx={{ width: 400, wordWrap: 'break-word' }}
      role='presentation'
      display='flex'
      flexDirection='column'
    >
      <TextField id='filled-basic' label='User Name' variant='filled' />
      <Typography variant='h6' gutterBottom sx={{ ml: 3, mt: 2 }}>
        Level: {getLevel()} Exp: {user.experience}{' '}
        <Button onClick={() => gainExp(100)}>Gain exp</Button>
      </Typography>
      <Divider />
      <Box>
        <MissionsList width='100%'></MissionsList>
      </Box>
      <Divider />

      <Button
        variant='contained'
        onClick={handleLock2}
        sx={{ marginBottom: 2 }}
      >
        {isLvl2Blocked ? 'Hide Message' : 'Show Message'}
      </Button>
    </Box>
  );

  return (
    <div>
      <Drawer variant='persistent' anchor='right' open={open} onClose={onClose}>
        <Toolbar variant='dense' />
        {DrawerList}
      </Drawer>
    </div>
  );
}
