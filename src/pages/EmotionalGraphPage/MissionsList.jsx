import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 10,
  boxShadow: theme.shadows[10],
  transition: 'background-color 0.3s',
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800],
}));

const MissionList = ({ missions = [], onComplete = () => {} }) => {
  const handleComplete = (value) => onComplete(value);

  return (
    <List>
      {missions.map((value, index) => (
        <StyledListItem
          sx={{ mt: 2 }}
          key={value.mission}
          aria-description={`Mission ${index + 1} ${value.mission}`}
          secondaryAction={
            <IconButton
              edge='end'
              aria-label='Complete mission'
              disabled={value.completed}
              onClick={() => handleComplete(value)}
            >
              {value.completed ? (
                <CheckIcon color='success' />
              ) : (
                <TaskAltIcon />
              )}
            </IconButton>
          }
        >
          <ListItemText
            primary={value.mission}
            secondary={
              <Typography variant='caption'>{value.experience} exp</Typography>
            }
          ></ListItemText>
        </StyledListItem>
      ))}
    </List>
  );
};

export default MissionList;
