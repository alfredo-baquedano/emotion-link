import { React, useEffect, useState } from 'react';
import {
  Button,
  Drawer,
  Divider,
  Typography,
  Box,
  Toolbar,
  LinearProgress,
} from '@mui/material';
import MissionsList from './MissionsList';
import useUser from '../../contexts/UserContext';
import missions from './../../contants/missions.json';

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
        <LinearProgress variant='determinate' color='success' value={100} />
      ) : (
        <LinearProgress variant='determinate' value={getProgression()} />
      )}
      <Divider />
      <MissionsList
        missions={getDailyMissions()}
        onComplete={(m) => handleCompleteMission(m)}
      ></MissionsList>
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
