import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import emotionsData from '../../contants/emotions.json';

const getEmotionArray = (obj) => {
  const result = [];
  const recurse = (currentObj) => {
    if (currentObj.name !== 'none') result.push(currentObj);
    if (currentObj.children && Array.isArray(currentObj.children)) {
      currentObj.children.forEach((child) => recurse(child));
    }
  };
  recurse(obj);
  return result;
};

const emotions = getEmotionArray(emotionsData);

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

  const filteredEmotions = emotions.filter((emotion) =>
    eventEmotions.includes(emotion.name),
  );

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
          {filteredEmotions.map((emotion) => (
            <Chip
              key={emotion.name}
              label={emotion.displayName}
              sx={{
                backgroundColor: emotion.color,
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
