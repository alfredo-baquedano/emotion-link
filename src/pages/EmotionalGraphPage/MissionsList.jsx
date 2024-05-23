import { useId } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

const MissionList = ({ missions = [], onComplete = () => {} }) => {
  const labelId = useId();

  const handleComplete = (value) => onComplete(value);

  return (
    <List>
      {missions.map((value) => {
        return (
          <ListItem key={value.mission} disablePadding>
            <ListItemButton role={undefined} disableRipple dense>
              <ListItemText>{value.mission}</ListItemText>
              <ListItemIcon>
                <Checkbox
                  edge='end'
                  onClick={() => handleComplete(value)}
                  disabled={value.completed}
                  checked={value.completed}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <Typography variant='caption'>{value.experience} exp</Typography>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MissionList;
