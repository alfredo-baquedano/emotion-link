import React, { useState, useEffect } from 'react';
import DrawerFilter from './DrawerFilter';
import EmotionalChart from './EmotionalChart';
import CreateEventForm from './CreateEventForm';
import EditEventForm from './EditEventForm';
import { Dialog, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import emotionList from '../../contants/emotions.json';
import ConfirmDeleteEvent from './ConfirmDeleteEvent';
import VirtualPet from './VirtualPet';
import petImage from '../../../image/petImage.png';
import VisualizeEvent from './VisualizeEvent';
import { Star, Tune } from '@mui/icons-material';
import MissionsDrawer from './MissionsDrawer';
import ToggleColorMode from './../../components/ToggleColorMode';

const EmotionalGraphPage = () => {
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [openDeleteEvent, setOpenDeleteEvent] = useState(false);
  const [openViewEvent, setOpenViewEvent] = useState(false);
  const [filters, setFilters] = useState({
    emotions: null,
    impactRange: [1, 10],
    searchTerm: '',
    peopleInvolved: '',
    startDate: null,
    endDate: null,
  });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [openMissions, setOpenMissions] = useState(false);

  useEffect(() => {
    setEvents(
      JSON.parse(localStorage.getItem('events')) ?? [
        {
          id: 'be1a920a-d36a-4bdd-b360-13bb5c9b0800',
          name: 'Myself',
          date: Date.now(),
          location: 'Home',
          participants: [],
          relationships: {
            preceded_by: [],
            followed_by: [],
          },
          impact: 0,
          emotions: [],
        },
      ],
    );
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
    const matchesEmotions =
      !filters.emotions ||
      node.emotions.some((emotion) => filters.emotions?.includes(emotion));

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
    <div style={{ height: 'calc(100vh - 48px)' }}>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant='dense'>
          <Typography
            sx={{ marginRight: 'auto' }}
            variant='h6'
            color='inherit'
            component='div'
          >
            Emotional Link
          </Typography>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => setOpenFilters((open) => !open)}
          >
            <Tune />
          </IconButton>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => setOpenMissions((open) => !open)}
          >
            <Star />
          </IconButton>
          <ToggleColorMode />
        </Toolbar>
      </AppBar>
      <DrawerFilter
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        filters={filters}
        setFilters={setFilters}
        events={events}
      />
      <MissionsDrawer
        open={openMissions}
        onClose={() => setOpenMissions(false)}
      />
      <Toolbar variant='dense' />
      <Dialog open={openCreateEvent} onClose={handleCloseCreateEvent}>
        <CreateEventForm
          events={events}
          relatedEvent={selectedEvent}
          emotionsList={emotionList}
          onCreate={handleCreateEvent}
          onClose={handleCloseCreateEvent}
        />
      </Dialog>
      <Dialog open={openEditEvent} onClose={handleCloseEditEvent}>
        <EditEventForm
          events={events}
          currentEvent={selectedEvent}
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
