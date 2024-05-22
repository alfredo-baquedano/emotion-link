import React, { useState, useEffect } from 'react';
import DrawerFilter from './DrawerFilter';
import EmotionalChart from './EmotionalChart';
import CreateEventForm from './CreateEventForm';
import EditEventForm from './EditEventForm';
import { Dialog } from '@mui/material';
import emotionList from '../../contants/emotions.json';
import ConfirmDeleteEvent from './ConfirmDeleteEvent';
import VirtualPet from './VirtualPet';
import petImage from '../../../image/petImage.png';
import VisualizeEvent from './VisualizeEvent';

const EmotionalGraphPage = () => {
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [openDeleteEvent, setOpenDeleteEvent] = useState(false);
  const [openViewEvent, setOpenViewEvent] = useState(false);
  const [filters, setFilters] = useState({
    joy: true,
    surprise: true,
    sadness: true,
    anger: true,
    fear: true,
    love: true,
    impactRange: [1, 10],
    searchTerm: '',
    peopleInvolved: '',
    startDate: null,
    endDate: null,
  });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleOpenDeleteEvent = (e) => {
    setSelectedEvent(e.target.__data__);
    setOpenDeleteEvent(true);
  };

  const handleCloseDeleteEvent = () => {
    setOpenDeleteEvent(false);
  };

  const handleOpenViewEvent = (e) => {
    e.stopPropagation();
    setSelectedEvent(e.target.__data__);
    setOpenViewEvent(true);
  };

  const handleCloseViewEvent = () => {
    setOpenViewEvent(false);
    setSelectedEvent(null);
  };

  const handleCreateEvent = (event) => {
    setEvents([...events, event]);
    setOpenCreateEvent(false);
  };

  const handleEditEvent = (event) => {
    setEvents(events.map((e) => (e.id === event.id ? event : e)));
    setOpenEditEvent(false);
  };

  const handleDeleteEvent = (event) => {
    const index = events.findIndex((e) => event.id === e.id);
    if (index > -1) setEvents(events.filter((_, i) => i !== index));
    setOpenDeleteEvent(false);
  };

  const filteredEvents = events.map((node) => {
    const eventDate = new Date(node.date);
    const isDateInRange =
      (!filters.startDate || eventDate >= new Date(filters.startDate)) &&
      (!filters.endDate || eventDate <= new Date(filters.endDate));
    const matchesImpactRange =
      node.impact >= filters.impactRange[0] &&
      node.impact <= filters.impactRange[1];
    const matchesSearchTerm =
      !filters.searchTerm ||
      node.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesPeopleInvolved =
      !filters.peopleInvolved ||
      node.participants.some((p) =>
        p.toLowerCase().includes(filters.peopleInvolved.toLowerCase()),
      );
    const matchesEmotions = node.emotions.some((emotion) => filters[emotion]);

    const visible =
      node.name === 'Myself' ||
      (matchesEmotions &&
        matchesImpactRange &&
        matchesSearchTerm &&
        matchesPeopleInvolved &&
        isDateInRange);

    return { ...node, visible };
  });

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
        events={filteredEvents}
        filters={filters}
        onClickCreate={handleOpenCreateEvent}
        onClickEdit={handleOpenEditEvent}
        onClickDelete={handleOpenDeleteEvent}
        onClickView={handleOpenViewEvent}
      />
      <Dialog open={openViewEvent} onClose={handleCloseViewEvent}>
        <VisualizeEvent event={selectedEvent} onClose={handleCloseViewEvent} />
      </Dialog>
      <VirtualPet petImage={petImage} />
    </div>
  );
};

export default EmotionalGraphPage;
