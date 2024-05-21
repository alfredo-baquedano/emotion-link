import React, { useState, useEffect } from 'react';
import DrawerFilter from './DrawerFilter';
import EmotionalChart from './EmotionalChart';
import staticEvents from './testData.json';
import CreateEventForm from './CreateEventForm';
import EditEventForm from './EditEventForm';
import { Dialog } from '@mui/material';
import emotionList from '../../contants/emotions.json';
import ConfirmDeleteEvent from './ConfirmDeleteEvent';

const EmotionalGraphPage = () => {
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [openDeleteEvent, setOpenDeleteEvent] = useState(false);
  const [filters, setFilters] = useState({
    joy: true,
    surprise: true,
    sadness: true,
    anger: true,
    fear: true,
    love: true,
    impactRange: [1, 10],
  });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem('events')) ?? []);
  }, []);

  useEffect(() => {
    if (events.length) localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleOpenCreateEvent = (e) => {
    setSelectedEvent(e.target.__data__);
    setOpenCreateEvent(true);
  };

  const handleCloseDeleteEvent = () => {
    setOpenDeleteEvent(false);
  };

  const handleOpenDeleteEvent = (e) => {
    setSelectedEvent(e.target.__data__);
    setOpenDeleteEvent(true);
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

  const handleDeleteEvent = (event) => {
    const index = events.findIndex((e) => event.id === e.id);
    if (index > -1) setEvents(events.toSpliced(index, 1));
    setOpenDeleteEvent(false);
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
      <Dialog open={openDeleteEvent} onClose={handleCloseDeleteEvent}>
        <ConfirmDeleteEvent
          event={selectedEvent}
          onDelete={handleDeleteEvent}
          onClose={handleCloseDeleteEvent}
        />
      </Dialog>
      <EmotionalChart
        events={events}
        filters={filters}
        onClickCreate={handleOpenCreateEvent}
        onClickEdit={handleOpenEditEvent}
        onClickDelete={handleOpenDeleteEvent}
      />
    </div>
  );
};

export default EmotionalGraphPage;
