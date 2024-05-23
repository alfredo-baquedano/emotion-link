import React from 'react';
import {
  Button,
  Drawer,
  Divider,
  Typography,
  Box,
  Toolbar,
  LinearProgress,
} from '@mui/material';
import MissionList from './MissionsList';
import useUser from '../../contexts/UserContext';
import missions from '../../contants/missions.json';
import { styled } from '@mui/system';

const StyledLinearProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 5,
  backgroundColor: '#d3d3d3',
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    background: 'linear-gradient(45deg, #9c27b0, #8e24aa)',
  },
});

export default function MissionsDrawer({ open, onClose }) {
  const { user, setUser, gainExp, getLevel, getDailyMissions } = useUser();
  const userLevel = getLevel();

  const getProgression = () => {
    const expRegToNextLevel =
      missions[userLevel].requiredExp - missions[userLevel - 1].requiredExp;
    const expCurrentProgression =
      user.experience - missions[userLevel - 1].requiredExp;

    return (expCurrentProgression / expRegToNextLevel) * 100;
  };

  const handleCompleteMission = (mission) => {
    setUser((prevUser) => ({
      ...prevUser,
      currentDailyMissions: prevUser.currentDailyMissions.map((m) =>
        m.mission === mission.mission ? { ...m, completed: true } : m,
      ),
    }));
    gainExp(mission.experience);
  };

  const DrawerList = (
    <Box sx={{ width: '100%', p: 3 }} display='flex' flexDirection='column'>
      <Typography variant='h6' gutterBottom sx={{ ml: 3, mt: 2 }}>
        Level {userLevel}
        <Button onClick={() => gainExp(100)}>Gain exp</Button>
      </Typography>
      {userLevel === 3 ? (
        <StyledLinearProgress
          variant='determinate'
          color='success'
          value={100}
        />
      ) : (
        <StyledLinearProgress variant='determinate' value={getProgression()} />
      )}
      <Divider />
      <MissionList
        missions={getDailyMissions()}
        onComplete={(m) => handleCompleteMission(m)}
      />
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
