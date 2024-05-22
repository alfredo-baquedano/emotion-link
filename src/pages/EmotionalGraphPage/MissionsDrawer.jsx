import { React, useState } from 'react';
import {
  Button,
  Drawer,
  Divider,
  Typography,
  Box,
  TextField,
} from '@mui/material';

export default function MissionsDrawer() {
  const [open, setOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const handleLock = () => {
    setIsLocked(!isLocked);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box
      sx={{ width: 300 }}
      role='presentation'
      display='flex'
      flexDirection='column'
    >
      <TextField id='filled-basic' label='User Name' variant='filled' />
      <Typography variant='h6' gutterBottom sx={{ ml: 3, mt: 2 }}>
        Nivel:
      </Typography>
      <Divider />
      <Box variant='container' sx={{ position: 'relative' }}>
        {isLocked && (
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
          waweaw waweawwawwwwwwwwwwwwwww
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant='h6' gutterBottom sx={{ ml: 3, mt: 2 }}>
          Nivel 2
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant='h6' gutterBottom sx={{ ml: 3, mt: 2 }}>
          Nivel 3
        </Typography>
      </Box>
      <Button variant='contained' onClick={handleLock} sx={{ marginBottom: 2 }}>
        {isLocked ? 'Hide Message' : 'Show Message'}
      </Button>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Missions</Button>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
