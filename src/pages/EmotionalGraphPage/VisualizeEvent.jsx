import React from 'react';
import {
  Dialog,
  Card,
  CardContent,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';

const VisualizeEvent = ({ event, onClose }) => {
  if (!event) return null;

  const {
    date,
    name,
    location,
    participants = [],
    impact,
    emotions = [],
  } = event;

  return (
    <Dialog open={Boolean(event)} onClose={onClose}>
      <DialogTitle>Event:</DialogTitle>
      <DialogContent>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              {date}
            </Typography>
            <Typography variant='h5' component='div'>
              {name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {location}
            </Typography>
            <Typography variant='body2'>
              Participants: {participants.join(', ')}
            </Typography>
            <Typography variant='body2'>Impact: {impact}</Typography>
            <Typography variant='body2'>
              Emotions: {emotions.join(', ')}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizeEvent;
