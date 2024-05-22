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

export default function MissionsDrawer({ open, onClose }) {
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
        Level:
      </Typography>
      <Divider />
      <Box>
        <MissionsList width='100%'></MissionsList>
      </Box>
      <Divider />
      <Box variant='container' sx={{ position: 'relative', width: '100%' }}>
        {isLvl2Blocked && (
          <Box
            sx={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'background-color 0.3s',
            }}
          >
            <Typography variant='h6' gutterBottom sx={{ ml: 3, mt: 2 }}>
              Blocked!
            </Typography>
          </Box>
        )}
        <Typography variant='h6' gutterBottom sx={{ ml: 3, mt: 2 }}>
          LvL 2 Missions:
        </Typography>
        <Typography>-Create 10 events.</Typography>
        <Typography>
          -Create 2 events of each different initial Emotion.
        </Typography>
        <Typography>-Create 5 events with lvl 2 Emotions.</Typography>
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
