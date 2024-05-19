import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Chip,
  Box,
  Slider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const CreateEventForm = ({ onCreate, onClose, relatedEvent, emotionsList }) => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: '',
    participants: '',
    impact: 5,
    emotions: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleEmotionsChange = (event) => {
    const {
      target: { value }
    } = event;
    setEventData({
      ...eventData,
      emotions: typeof value === 'string' ? value.split(',') : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventData,
      id: uuidv4(),
      participants: eventData.participants.split(',').map(p => p.trim()),
      impact: parseInt(eventData.impact)
    };
    onCreate(newEvent);
    setEventData({
      name: '',
      date: '',
      location: '',
      participants: '',
      impact: '',
      emotions: []
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <DialogTitle id="alert-dialog-title">
        Create Related Event
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          name="name"
          label="Event Name"
          fullWidth
          value={eventData.name}
          onChange={handleChange}
        />
        <TextField
          sx={{ mt: 2 }}
          name="date"
          label="Date"
          type="date"
          fullWidth
          value={eventData.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          sx={{ mt: 2 }}
          name="location"
          label="Location"
          fullWidth
          value={eventData.location}
          onChange={handleChange}
        />
        <TextField
          sx={{ mt: 2 }}
          name="participants"
          label="Participants (comma separated)"
          fullWidth
          value={eventData.participants}
          onChange={handleChange}
        />
        <FormControl
          sx={{ mt: 2 }}
          fullWidth>
          <Typography id="impact-label" gutterBottom>
            Impact
          </Typography>
          <Slider
            name='impact'
            aria-label='impact-label'
            defaultValue={5}
            onChange={handleChange}
            value={eventData.impact}
            valueLabelDisplay="auto"
            shiftStep={1}
            step={1}
            marks
            min={1}
            max={10}
          />
        </FormControl>
        <FormControl
          sx={{ mt: 2 }}
          fullWidth>
          <InputLabel id="emotions-label">Emotions</InputLabel>
          <Select
            labelId="emotions-label"
            name="emotions"
            multiple
            value={eventData.emotions}
            onChange={handleEmotionsChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value.name} label={value.display_name} />
                ))}
              </Box>
            )}
          >
            {emotionsList.map((emotion) => (
              <MenuItem key={emotion.name} value={emotion}>
                {emotion.display_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
          Create Event
        </Button>
      </DialogActions>
    </Box>
  );
};

export default CreateEventForm;