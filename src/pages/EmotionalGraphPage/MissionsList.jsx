import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import { useId } from 'react';
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem)({
  backgroundColor: '#ffe4e1',
  borderRadius: '10px',
  margin: '5px 0',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#ffcccc',
  },
});

const StyledListItemText = styled(ListItemText)({
  margin: '0 10px',
  color: '#000',
});

const StyledCheckbox = styled(Checkbox)({
  color: '#9c27b0',
  '&.Mui-checked': {
    color: '#7b1fa2',
  },
});

const MissionList = ({ missions = [], onComplete = () => {} }) => {
  const labelId = useId();

  const handleComplete = (value) => onComplete(value);

  return (
    <List>
      {missions.map((value) => (
        <StyledListItem key={value.mission} disablePadding>
          <ListItemButton role={undefined} disableRipple dense>
            <StyledListItemText>{value.mission}</StyledListItemText>
            <ListItemIcon>
              <StyledCheckbox
                edge='end'
                onClick={() => handleComplete(value)}
                disabled={value.completed}
                checked={value.completed}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <Typography variant='caption' style={{ color: '#000' }}>
              {value.experience} exp
            </Typography>
          </ListItemButton>
        </StyledListItem>
      ))}
    </List>
  );
};

export default MissionList;
