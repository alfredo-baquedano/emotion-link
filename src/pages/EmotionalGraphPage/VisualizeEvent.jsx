import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

const emotions = {
  joy: {
    name: 'joy',
    display_name: 'Joy',
    color: '#87D37C',
  },
  surprise: {
    name: 'surprise',
    display_name: 'Surprise',
    color: '#FFCC99',
  },
  sadness: {
    name: 'sadness',
    display_name: 'Sadness',
    color: '#99CCFF',
  },
  anger: {
    name: 'anger',
    display_name: 'Anger',
    color: '#ff4d4d',
  },
  fear: {
    name: 'fear',
    display_name: 'Fear',
    color: '#8E44AD',
  },
  love: {
    name: 'love',
    display_name: 'Love',
    color: '#FFBDFF',
  },
};

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

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {date}
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
              key={emotion}
              label={emotions[emotion].display_name}
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
