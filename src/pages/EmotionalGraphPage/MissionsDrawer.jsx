import { Drawer, Typography, Box, Toolbar, Divider } from '@mui/material';
import { useUser } from '../../contexts/UserContext';
import { styled } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';
import missions from '../../contants/missions.json';
import MissionList from './MissionsList';
import { blue, grey } from '@mui/material/colors';

const StyledLinearProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 8,
  backgroundColor: grey[400],
  '& .MuiLinearProgress-bar': {
    borderRadius: 8,
    background: blue[600],
  },
});

export default function MissionsDrawer({ open, onClose }) {
  const { user, setUser, gainExp, getLevel } = useUser();
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
    <Box sx={{ width: 360, p: 3 }} display='flex' flexDirection='column'>
      <Box sx={{ mt: 2 }}>
        <Typography variant='h6' gutterBottom>
          Level {userLevel}
        </Typography>
      </Box>
      {userLevel === 3 ? (
        <StyledLinearProgress variant='determinate' value={100} />
      ) : (
        <StyledLinearProgress
          variant='determinate'
          sx={{
            color: blue[700],
          }}
          value={getProgression()}
        />
      )}

      <Divider sx={{ my: 2 }} />
      <Typography variant='h6' gutterBottom>
        Daily Missions
      </Typography>
      <MissionList
        missions={user.currentDailyMissions}
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
