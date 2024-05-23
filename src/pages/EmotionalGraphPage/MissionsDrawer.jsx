import { Drawer, Typography, Box, Toolbar } from '@mui/material';
import useUser from '../../contexts/UserContext';
import { styled } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';
import missions from '../../contants/missions.json';
import MissionList from './MissionsList';

const StyledLinearProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 5,
  backgroundColor: '#d3d3d3',
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    background: 'linear-gradient(45deg, #9c27b0, #7b1fa2)',
  },
});

export default function MissionsDrawer({ open, onClose }) {
  const { user, setUser, getLevel, getDailyMissions } = useUser();
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
  };

  const DrawerList = (
    <Box sx={{ width: '100%', p: 3 }} display='flex' flexDirection='column'>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 3, mt: 2 }}>
        <Typography variant='h6' gutterBottom style={{ color: '#fff' }}>
          Level {userLevel}
        </Typography>
        <Typography
          variant='h6'
          gutterBottom
          style={{ color: '#ffeb3b', marginLeft: '10px' }}
        >
          Daily Missions
        </Typography>
      </Box>
      {userLevel === 3 ? (
        <StyledLinearProgress
          variant='determinate'
          color='success'
          value={100}
        />
      ) : (
        <StyledLinearProgress variant='determinate' value={getProgression()} />
      )}
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
