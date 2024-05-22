import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const EventCard = ({ event }) => {
  if (!event) return null;

  return (
    <Card sx={{ minWidth: 275, position: 'absolute', top: '20%', left: '20%' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {event.date}
        </Typography>
        <Typography variant='h5' component='div'>
          {event.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {event.location}
        </Typography>
        <Typography variant='body2'>
          Participants: {event.participants.join(', ')}
        </Typography>
        <Typography variant='body2'>Impact: {event.impact}</Typography>
        <Typography variant='body2'>
          Emotions: {event.emotions.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
