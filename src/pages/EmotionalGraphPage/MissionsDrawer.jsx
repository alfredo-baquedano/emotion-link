import {
  Drawer,
  Typography,
  Box,
  Toolbar,
  Divider,
  Tooltip,
} from '@mui/material';
import { useUser } from '../../contexts/UserContext';
import { styled } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';
import missions from '../../contants/missions.json';
import MissionList from './MissionsList';
import { blue, grey } from '@mui/material/colors';
import MissionTimer from './MissionTimer';

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

  const expRegToNextLevel =
    missions[userLevel]?.requiredExp ?? 0 - missions[userLevel - 1].requiredExp;
  const expCurrentProgression =
    user.experience - missions[userLevel - 1].requiredExp;

  const currentProgression = (expCurrentProgression / expRegToNextLevel) * 100;

  const handleCompleteMission = (mission) => {
    setUser((prevUser) => ({
      ...prevUser,
      currentDailyMissions: prevUser.currentDailyMissions.map((m) =>
        m.mission === mission.mission ? { ...m, completed: true } : m,
      ),
    }));
    gainExp(mission.experience);
  };

  return (
    <div>
      <Drawer variant='persistent' anchor='right' open={open} onClose={onClose}>
        <Toolbar variant='dense' />
        <Box sx={{ width: 360, p: 3 }} display='flex' flexDirection='column'>
          <Box sx={{ mt: 2 }}>
            <Typography variant='h6' gutterBottom>
              Level {userLevel}
            </Typography>
          </Box>
          {userLevel === 3 ? (
            <Tooltip
              describeChild
              title='You have reached max level!'
              placement='top'
              arrow
            >
              <StyledLinearProgress variant='determinate' value={100} />
            </Tooltip>
          ) : (
            <Tooltip
              describeChild
              title={`You have ${expCurrentProgression} EXP on your current level. Earn ${expRegToNextLevel - expCurrentProgression} EXP to level up!`}
              placement='top'
              arrow
            >
              <StyledLinearProgress
                variant='determinate'
                sx={{
                  color: blue[700],
                }}
                value={currentProgression}
              />
            </Tooltip>
          )}

          <Divider sx={{ my: 2 }} />
          <Typography variant='h6' gutterBottom>
            Daily Missions <MissionTimer />
          </Typography>
          <MissionList
            missions={user.currentDailyMissions}
            onComplete={(m) => handleCompleteMission(m)}
          />
        </Box>
      </Drawer>
    </div>
  );
}
