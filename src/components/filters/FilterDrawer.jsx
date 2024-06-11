import { useId, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Slider from '@mui/material/Slider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import emotionsData from '../../contants/emotions.json';
import { Toolbar, IconButton } from '@mui/material';
import EmotionSelect from '../EmotionSelect';
import ReplayIcon from '@mui/icons-material/Replay';

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

export default function FilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
  events = [],
}) {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');
  const [peopleInvolved, setPeopleInvolved] = useState(
    filters.peopleInvolved || '',
  );
  const [startDate, setStartDate] = useState(filters.startDate || null);
  const [endDate, setEndDate] = useState(filters.endDate || null);
  const [impactRange, setImpactRange] = useState(filters.impactRange);
  const impactLabel = useId();

  const handleEmotionChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      emotions: event.target.value,
    }));
  };

  const handleEmotionReset = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      emotions: null,
    }));
  };

  const handleImpactChange = (event, newValue) => {
    setImpactRange(newValue);
    setFilters((prevFilters) => ({
      ...prevFilters,
      impactRange: newValue,
    }));
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm: e.target.value,
    }));
  };

  const handlePeopleInvolvedChange = (e) => {
    setPeopleInvolved(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      peopleInvolved: e.target.value,
    }));
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setFilters((prevFilters) => ({
      ...prevFilters,
      endDate: date,
    }));
  };

  const usedEmotions = new Set();
  events.forEach((event) => {
    if (event.emotions) {
      event.emotions.forEach((emotion) => {
        usedEmotions.add(emotion);
      });
    }
  });

  const filteredEmotions = emotions.filter((emotion) =>
    usedEmotions.has(emotion.name),
  );

  const DrawerList = (
    <Box sx={{ width: 330, p: 3 }} role='presentation'>
      <Typography variant='h6' gutterBottom>
        Search
      </Typography>
      <TextField
        autoFocus
        label='Search by event'
        value={searchTerm}
        onChange={handleSearchTermChange}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Divider />
      <TextField
        label='Search by People Involved'
        value={peopleInvolved}
        onChange={handlePeopleInvolvedChange}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Divider sx={{ mb: 2 }} />
      <Typography variant='h6' sx={{ mt: 3 }}>
        Filter by date
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Start Date'
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
          sx={{ mt: 2, width: '100%' }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='End Date'
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
          sx={{ mt: 2, width: '100%' }}
        />
      </LocalizationProvider>
      <Divider sx={{ mb: 3 }} />
      <Typography id={impactLabel} variant='h6' sx={{ mt: 3 }}>
        Filter by impact
      </Typography>
      <Slider
        aria-labelledby={impactLabel}
        value={impactRange}
        onChange={handleImpactChange}
        step={1}
        marks
        min={1}
        max={10}
        valueLabelDisplay='auto'
        sx={{ mt: 2 }}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant='h6' sx={{ mt: 3 }}>
        Filter by emotions{' '}
        <IconButton
          aria-label='Restart-emotion-filters'
          onClick={handleEmotionReset}
        >
          <ReplayIcon />
        </IconButton>
      </Typography>
      <EmotionSelect
        sx={{ mt: 3 }}
        options={filteredEmotions}
        name='emotions'
        ariaLabel='Filter by emotions'
        value={
          filters.emotions ?? filteredEmotions.map((emotion) => emotion.name)
        }
        onChange={handleEmotionChange}
      />
    </Box>
  );

  return (
    <div>
      <Drawer variant='persistent' anchor='left' open={open} onClose={onClose}>
        <Toolbar variant='dense' />
        {DrawerList}
      </Drawer>
    </div>
  );
}
