import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Avatar,
  Tooltip,
} from '@mui/material';
import dayjs from 'dayjs';
import { getEmotionMap } from '@/utils/emotions';
import { getEventNeonBorderStyle } from '@/utils/styling';
import { useTheme } from '@emotion/react';

const emotions = getEmotionMap();
const VisualizeEvent = ({ event }) => {
  const theme = useTheme();
  if (!event) return null;

  const {
    date,
    name,
    description,
    location,
    participants = [],
    impact,
    emotions: eventEmotions = [],
  } = event;

  const formattedDate = dayjs(date).format('MM/DD/YYYY');

  console.log('theme.palette', theme.palette);

  return (
    <Card sx={{ minWidth: 300, ...getEventNeonBorderStyle(event) }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {formattedDate}
        </Typography>
        <Typography variant='h5'>
          {name}{' '}
          <Tooltip title='level of impact' arrow placement='top'>
            <Avatar
              sx={{
                display: 'inline-flex',
                width: 26,
                height: 26,
                p: 0,
                textAlign: 'center',
                color: theme.palette.info.contrastText,
                bgcolor: theme.palette.text.secondary,
              }}
            >
              {impact}
            </Avatar>
          </Tooltip>
        </Typography>
        {location && (
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {location}
          </Typography>
        )}
        {participants.length > 0 && (
          <Typography variant='body2'>
            Participants {participants.join(', ')}
          </Typography>
        )}
        <Typography variant='body2'>{description}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
          {eventEmotions.map((emotion) => (
            <Chip
              key={emotions[emotion].name}
              label={emotions[emotion].displayName}
              sx={{
                backgroundColor: emotions[emotion].color,
                color: '#000',
                m: 0.5,
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default VisualizeEvent;
