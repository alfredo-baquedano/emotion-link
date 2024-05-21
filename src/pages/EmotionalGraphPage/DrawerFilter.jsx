import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Slider from '@mui/material/Slider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

export default function DrawerFilter({ filters, setFilters }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');
  const [peopleInvolved, setPeopleInvolved] = useState(
    filters.peopleInvolved || '',
  );
  const [startDate, setStartDate] = useState(filters.startDate || null);
  const [endDate, setEndDate] = useState(filters.endDate || null);
  const [impactRange, setImpactRange] = useState(filters.impactRange);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleToggle = (emotion) => () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [emotion]: !prevFilters[emotion],
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

  const DrawerList = (
    <Box sx={{ width: 300 }} role='presentation'>
      <Typography variant='h6' gutterBottom sx={{ ml: 3, mt: 2 }}>
        Filters:
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
        sx={{ mt: 2, mb: 2, mr: 3, ml: 3, width: '80%' }}
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
        sx={{ mt: 2, mb: 2, mr: 3, ml: 3, width: '80%' }}
      />
      <Divider sx={{ mb: 2 }} />
      <Typography variant='h8' sx={{ ml: 3, mt: 3 }}>
        Filter by date:
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Start Date'
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
          fullWidth
          sx={{ mt: 2, mb: 2, mr: 3, ml: 3, width: '80%' }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='End Date'
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
          fullWidth
          sx={{ mt: 2, mb: 2, mr: 3, ml: 3, width: '80%' }}
        />
      </LocalizationProvider>
      <Divider sx={{ mb: 3 }} />
      <Typography variant='h8' sx={{ ml: 3, mt: 3 }}>
        Filter by impact:
      </Typography>
      <Slider
        value={impactRange}
        onChange={handleImpactChange}
        step={1}
        marks
        min={1}
        max={10}
        valueLabelDisplay='auto'
        sx={{ mt: 2, mb: 2, mr: 3, ml: 3, width: '80%' }}
      />
      <Divider sx={{ mb: 3 }} />
      <Typography variant='h8' sx={{ ml: 3, mt: 3 }}>
        Filter by emotions:
      </Typography>
      <List sx={{ mt: 2 }}>
        {Object.keys(emotions).map((key) => {
          const emotion = emotions[key];
          return (
            <ListItem key={emotion.name} disablePadding>
              <Chip
                label={emotion.display_name}
                style={{
                  backgroundColor: filters[emotion.name]
                    ? emotion.color
                    : '#E0E0E0',
                  color: filters[emotion.name] ? '#000' : '#000',
                }}
                onClick={handleToggle(emotion.name)}
                sx={{ margin: '5px' }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Filter</Button>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
