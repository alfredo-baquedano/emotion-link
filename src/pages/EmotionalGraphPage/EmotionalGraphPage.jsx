import React, { useState, useEffect } from 'react';
import DrawerFilter from './DrawerFilter';
import EmotionalChart from './EmotionalChart';
import staticEvents from './testData.json';
import CreateEventForm from './CreateEventForm';
import EditEventForm from './EditEventForm';
import { Dialog } from '@mui/material';
import emotionList from '../../contants/emotions.json';

localStorage.setItem('events', JSON.stringify(staticEvents));

const EmotionalGraphPage = () => {
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [filters, setFilters] = useState({
    joy: true,
    surprise: true,
    sadness: true,
    anger: true,
    fear: true,
    love: true,
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem('events')) ?? []);
  }, []);

  const filteredEvents = events.filter((event) => {
    if (event.name === 'Myself') return true;
    return event.emotions.some((emotion) => filters[emotion]);
  });
  const handleOpenCreateEvent = () => {
    setOpenCreateEvent(true);
  };

  const handleCloseCreateEvent = () => {
    setOpenCreateEvent(false);
  };

  const handleOpenEditEvent = (e) => {
    e.stopPropagation();
    setOpenEditEvent(true);
  };

  const handleCloseEditEvent = () => {
    setOpenEditEvent(false);
  };

  const handleCreateEvent = (event) => {
    setEvents([...events, event]);
    setOpenCreateEvent(false);
  };

  const handleEditEvent = (event) => {
    setEvents([...events, event]);
    setOpenCreateEvent(false);
  };

  return (
    <div>
      <DrawerFilter filters={filters} setFilters={setFilters} />
      <Dialog open={openCreateEvent} onClose={handleCloseCreateEvent}>
        <CreateEventForm
          relatedEvent={''}
          onCreate={handleCreateEvent}
          emotionsList={emotionList}
          onClose={handleCloseCreateEvent}
        />
      </Dialog>
      <Dialog open={openEditEvent} onClose={handleCloseEditEvent}>
        <EditEventForm
          event={'currentEvent'}
          emotionsList={emotionList}
          onEdit={handleEditEvent}
          onClose={handleCloseEditEvent}
        />
      </Dialog>
      <EmotionalChart
        events={filteredEvents}
        onClickCreate={handleOpenCreateEvent}
        onClickEdit={handleOpenEditEvent}
      />
    </div>
  );
};

export default EmotionalGraphPage;
