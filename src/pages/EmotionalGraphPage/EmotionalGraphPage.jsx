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
    impactRange: [1, 10],
    searchTerm: '',
  });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem('events')) ?? []);
  }, []);

  const handleOpenCreateEvent = (e) => {
    setSelectedEvent(e.target.__data__);
    setOpenCreateEvent(true);
  };

  const handleCloseCreateEvent = () => {
    setOpenCreateEvent(false);
  };

  const handleOpenEditEvent = (e) => {
    e.stopPropagation();
    setSelectedEvent(e.target.__data__);
    setOpenEditEvent(true);
  };

  const handleCloseEditEvent = () => {
    setOpenEditEvent(false);
  };

  const handleCreateEvent = (event) => {
    console.log('event', event);
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
          relatedEvent={selectedEvent}
          onCreate={handleCreateEvent}
          emotionsList={emotionList}
          onClose={handleCloseCreateEvent}
        />
      </Dialog>
      <Dialog open={openEditEvent} onClose={handleCloseEditEvent}>
        <EditEventForm
          event={selectedEvent}
          emotionsList={emotionList}
          onEdit={handleEditEvent}
          onClose={handleCloseEditEvent}
        />
      </Dialog>
      <EmotionalChart
        events={events}
        filters={filters}
        onClickCreate={handleOpenCreateEvent}
        onClickEdit={handleOpenEditEvent}
      />
    </div>
  );
};

export default EmotionalGraphPage;
