import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  Box,
  Slider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EmotionSelect from './../../components/EmotionSelect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EditEventForm = ({ onCreate, onClose, currentEvent }) => {
  const [eventData, setEventData] = useState(currentEvent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleEmotionsChange = (event) => {
    const {
      target: { value },
    } = event;
    setEventData({
      ...eventData,
      emotions: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventData,
      participants: eventData.participants.split(',').map((p) => p.trim()),
      impact: parseInt(eventData.impact),
    };
    onCreate(newEvent);
    setEventData({
      name: '',
      date: '',
      location: '',
      participants: '',
      impact: '',
      emotions: [],
      relationship: {
        preceded_by: [relatedEvent],
      },
    });
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ p: 4 }}>
      <DialogTitle id='alert-dialog-title'>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          name='name'
          label='Event Name'
          fullWidth
          value={eventData.name}
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Event Date'
            renderInput={(params) => (
              <TextField
                {...params}
                name='date'
                value={eventData.date}
                onChange={handleChange}
              />
            )}
            sx={{ mt: 2, width: '100%' }}
          />
        </LocalizationProvider>
        <FormControl sx={{ mt: 2 }} fullWidth>
          <Typography id='impact-label' gutterBottom>
            Impact
          </Typography>
          <Slider
            name='impact'
            aria-label='impact-label'
            defaultValue={5}
            onChange={handleChange}
            value={eventData.impact}
            valueLabelDisplay='auto'
            shiftStep={1}
            step={1}
            marks
            min={1}
            max={10}
          />
        </FormControl>
        <EmotionSelect name='emotions' onChange={handleChange} />
        <Divider />
        <Accordion
          disableGutters
          sx={{
            m: -1,
            mt: 2,
            backgroundColor: 'transparent',
            boxShadow: 'unset',
            backgroundImage: 'unset',
          }}
        >
          <AccordionSummary
            sx={{ m: -1, backgroundColor: 'transparent' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            Show more options
          </AccordionSummary>
          <AccordionDetails sx={{ m: -1, backgroundColor: 'transparent' }}>
            <TextField
              sx={{ mt: 2 }}
              name='location'
              label='Location'
              fullWidth
              value={eventData.location}
              onChange={handleChange}
            />
            <TextField
              sx={{ mt: 2 }}
              name='participants'
              label='Participants (comma separated)'
              fullWidth
              value={eventData.participants}
              onChange={handleChange}
            />
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' color='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ ml: 2 }}
        >
          Update Event
        </Button>
      </DialogActions>
    </Box>
  );
};

export default EditEventForm;
