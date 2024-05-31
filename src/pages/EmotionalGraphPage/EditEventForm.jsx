import { useState } from 'react';
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
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EmotionSelect from './../../components/EmotionSelect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { getEventNeonBorderStyle } from '../../utils/styling';

const EditEventForm = ({ onEdit, onClose, currentEvent, events }) => {
  const [eventData, setEventData] = useState(currentEvent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventData,
      impact: parseInt(eventData.impact),
    };
    onEdit(newEvent);
    setEventData({
      name: '',
      description: '',
      date: '',
      location: '',
      participants: [],
      customTags: [],
      physicalFeelings: [],
      impact: '',
      details: '',
      emotions: [],
      relationships: {
        preceded_by: [],
        followed_by: [],
      },
    });
  };

  return (
    <Box sx={{ ...getEventNeonBorderStyle(eventData) }}>
      <Box component='form' onSubmit={handleSubmit} sx={{ p: 2 }}>
        <DialogTitle id='alert-dialog-title'>Edit Event</DialogTitle>
        <DialogContent sx={{ overflowY: 'auto', maxHeight: 500 }}>
          <TextField
            sx={{ mt: 2 }}
            name='name'
            label='Event Name'
            fullWidth
            value={eventData.name}
            onChange={handleChange}
          />
          <TextField
            sx={{ mt: 2 }}
            name='description'
            label='Description'
            multiline
            maxRows={4}
            fullWidth
            value={eventData.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Event Date'
              name='date'
              value={dayjs(eventData.date)}
              onChange={(v) =>
                handleChange({
                  target: { name: 'date', value: v.format('MM/DD/YYYY') },
                })
              }
              renderInput={(params) => (
                <TextField {...params} name='date' value={eventData.date} />
              )}
              sx={{ mt: 2, width: '100%' }}
            />
          </LocalizationProvider>
          <EmotionSelect
            name='emotions'
            value={eventData.emotions}
            onChange={handleChange}
          />
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
              <Autocomplete
                sx={{ mt: 2 }}
                multiple
                freeSolo
                value={eventData.relationships.followed_by ?? []}
                name='relationships'
                onChange={(event, newValue) => {
                  handleChange({
                    ...event,
                    target: {
                      ...event.target,
                      name: 'relationships',
                      value: {
                        ...eventData.relationships,
                        followed_by: newValue,
                      },
                    },
                  });
                }}
                options={events
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .filter((e) => e.name !== 'Myself' && e.id !== eventData.id)
                  .map((e) => e.id)}
                getOptionLabel={(option) =>
                  events.find((event) => event.id === option)?.name
                }
                renderTags={(value, getTagProps) => {
                  return value.map((option, index) => {
                    const event = events.find((e) => e.id === option);
                    return (
                      <Chip
                        {...getTagProps({ index })}
                        variant='outlined'
                        label={event.name}
                      />
                    );
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Related to'
                    placeholder='Add related event'
                  />
                )}
              />
              <TextField
                sx={{ mt: 2 }}
                name='location'
                label='Location'
                fullWidth
                value={eventData.location}
                onChange={handleChange}
              />
              <Autocomplete
                sx={{ mt: 2 }}
                multiple
                freeSolo
                value={eventData.participants}
                name='participants'
                onChange={(event, newValue) => {
                  handleChange({
                    ...event,
                    target: {
                      ...event.target,
                      name: 'participants',
                      value: newValue,
                    },
                  });
                }}
                options={events.reduce((acc, curr) => {
                  acc.push(
                    ...[...curr.participants, ...eventData.participants].sort(
                      (a, b) => a.localeCompare(b),
                    ),
                  );
                  return [...new Set(acc)];
                }, [])}
                renderTags={(value, getTagProps) => {
                  return value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      variant='outlined'
                      label={option}
                    />
                  ));
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Participants'
                    placeholder='Participant'
                  />
                )}
              />
              <Autocomplete
                sx={{ mt: 2 }}
                multiple
                freeSolo
                value={eventData.customTags ?? []}
                name='customTags'
                onChange={(event, newValue) => {
                  handleChange({
                    ...event,
                    target: {
                      ...event.target,
                      name: 'customTags',
                      value: newValue,
                    },
                  });
                }}
                options={events.reduce((acc, curr) => {
                  acc.push(
                    ...[
                      ...(curr.customTags ?? []),
                      ...(eventData.customTags ?? []),
                    ].sort((a, b) => a.localeCompare(b)),
                  );
                  return [...new Set(acc)];
                }, [])}
                renderTags={(value, getTagProps) => {
                  return value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      variant='outlined'
                      label={option}
                    />
                  ));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Custom Tags'
                    placeholder='Add Custom Tag'
                  />
                )}
              />
              <Autocomplete
                sx={{ mt: 2 }}
                multiple
                freeSolo
                value={eventData.physicalFeelings ?? []}
                name='physicalFeelings'
                onChange={(event, newValue) => {
                  handleChange({
                    ...event,
                    target: {
                      ...event.target,
                      name: 'physicalFeelings',
                      value: newValue,
                    },
                  });
                }}
                options={events.reduce((acc, curr) => {
                  acc.push(
                    ...[
                      ...(curr.physicalFeelings ?? []),
                      ...(eventData.physicalFeelings ?? []),
                    ].sort((a, b) => a.localeCompare(b)),
                  );
                  return [...new Set(acc)];
                }, [])}
                renderTags={(value, getTagProps) => {
                  return value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      variant='outlined'
                      label={option}
                    />
                  ));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Physical Feelings'
                    placeholder='Add Physical Feeling'
                  />
                )}
              />{' '}
              <TextField
                sx={{ mt: 2 }}
                name='whatYouDone'
                label='What have you done?'
                multiline
                maxRows={4}
                fullWidth
                value={eventData.whatYouDone}
                onChange={handleChange}
              />
              <TextField
                sx={{ mt: 2 }}
                name='wishedToDo'
                label='What would you have wished to do?'
                multiline
                maxRows={4}
                fullWidth
                value={eventData.wishedToDo}
                onChange={handleChange}
              />
              <TextField
                sx={{ mt: 2 }}
                name='cause'
                label='What caused it?'
                multiline
                maxRows={4}
                fullWidth
                value={eventData.cause}
                onChange={handleChange}
              />
              <TextField
                sx={{ mt: 2 }}
                name='whatDoesItMean'
                label='What does that emotion tell you?'
                multiline
                maxRows={4}
                fullWidth
                value={eventData.whatDoesItMean}
                onChange={handleChange}
              />
              <TextField
                sx={{ mt: 2 }}
                name='details'
                label='More Details'
                multiline
                maxRows={4}
                fullWidth
                value={eventData.details}
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
    </Box>
  );
};

export default EditEventForm;
