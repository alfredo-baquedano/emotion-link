import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { getEmotionMap } from '../../utils/emotions';
import dayjs from 'dayjs';
import { getEventNeonBorderStyle } from '../../utils/styling';

const emotions = getEmotionMap();
const VisualizeEvent = ({ event }) => {
  if (!event) return null;

  const {
    date,
    name,
    location,
    participants = [],
    impact,
    emotions: eventEmotions = [],
  } = event;

  const formattedDate = dayjs(date).format('MM/DD/YYYY');

  return (
    <Card sx={{ minWidth: 300, ...getEventNeonBorderStyle(event) }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {formattedDate}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        {location && (
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {location}
          </Typography>
        )}
        {participants.length > 0 && (
          <Typography variant='body2'>
            Participants: {participants.join(', ')}
          </Typography>
        )}
        <Typography variant='body2'>Impact: {impact}</Typography>
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
