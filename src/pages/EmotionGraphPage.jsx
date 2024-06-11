import { useState, useEffect, forwardRef } from 'react';
import EmotionNetworkChart from '@/components/charts/EmotionNetworkChart';
import CreateEventForm from '@/components/modals/CreateEventForm';
import EditEventForm from '@/components/modals/EditEventForm';
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import emotionList from '@/contants/emotions.json';
import ConfirmDeleteEvent from '@/components/modals/ConfirmDeleteEvent';
import VirtualPet from '../components/pet/VirtualPet';
import VisualizeEvent from '../components/modals/VisualizeEvent';
import { Star, Tune } from '@mui/icons-material';
import MissionsDrawer from '@/components/missions/MissionsDrawer';
import FilterDrawer from '@/components/filters/FilterDrawer';
import ToggleColorMode from '@/components/ToggleColorMode';
import Grow from '@mui/material/Grow';

const Transition = forwardRef((props, ref) => <Grow ref={ref} {...props} />);

const EmotionGraphPage = () => {
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
  const [filteredEvents, setFilteredEvents] = useState([]);
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

  useEffect(() => {
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
    setFilteredEvents(filteredEvents);
  }, [events, filters]);

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
    const updatedEvents = events.map((e) => {
      if (event.relationships.preceded_by.includes(e.id))
        e.relationships.followed_by = [
          ...e.relationships.followed_by,
          event.id,
        ];
      return e;
    });
    event.relationships.preceded_by = [];
    setEvents([...updatedEvents, event]);
    setOpenCreateEvent(false);
  };

  const handleEditEvent = (event) => {
    setEvents(events.map((e) => (e.id === event.id ? event : e)));
    setOpenEditEvent(false);
  };

  const handleDeleteEvent = (event) => {
    const updatedEvents = events.map((e) => {
      e.relationships.followed_by = e.relationships.followed_by.filter(
        (relatedEvent) => relatedEvent !== event.id,
      );
      return e;
    });
    const index = updatedEvents.findIndex((e) => event.id === e.id);
    if (index > -1) setEvents(updatedEvents.filter((_, i) => i !== index));
    setOpenDeleteEvent(false);
  };

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

          <Tooltip
            describeChild
            title='Open filters menu'
            arrow
            placement='top'
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='Filters menu'
              sx={{ mr: 2 }}
              onClick={() => setOpenFilters((open) => !open)}
            >
              <Tune />
            </IconButton>
          </Tooltip>
          <Tooltip
            describeChild
            title='Open missions menu'
            arrow
            placement='top'
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='Missions menu'
              sx={{ mr: 2 }}
              onClick={() => setOpenMissions((open) => !open)}
            >
              <Star />
            </IconButton>
          </Tooltip>
          <Tooltip
            describeChild
            title='Toggle color mode'
            arrow
            placement='top'
          >
            <ToggleColorMode />
          </Tooltip>
        </Toolbar>
      </AppBar>
      <FilterDrawer
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
      <Dialog
        TransitionComponent={Transition}
        open={openCreateEvent}
        onClose={handleCloseCreateEvent}
      >
        <CreateEventForm
          events={events}
          relatedEvent={selectedEvent}
          emotionsList={emotionList}
          onCreate={handleCreateEvent}
          onClose={handleCloseCreateEvent}
        />
      </Dialog>
      <Dialog
        TransitionComponent={Transition}
        open={openEditEvent}
        onClose={handleCloseEditEvent}
      >
        <EditEventForm
          events={events}
          currentEvent={selectedEvent}
          emotionsList={emotionList}
          onEdit={handleEditEvent}
          onClose={handleCloseEditEvent}
        />
      </Dialog>
      <Dialog
        TransitionComponent={Transition}
        open={openDeleteEvent}
        onClose={handleCloseDeleteEvent}
      >
        <ConfirmDeleteEvent
          event={selectedEvent}
          onDelete={handleDeleteEvent}
          onClose={handleCloseDeleteEvent}
        />
      </Dialog>
      <Dialog
        TransitionComponent={Transition}
        open={openViewEvent}
        onClose={handleCloseViewEvent}
      >
        <VisualizeEvent event={selectedEvent} onClose={handleCloseViewEvent} />
      </Dialog>
      <EmotionNetworkChart
        events={filteredEvents}
        filters={filters}
        onClickCreate={handleOpenCreateEvent}
        onClickEdit={handleOpenEditEvent}
        onClickDelete={handleOpenDeleteEvent}
        onClickView={handleOpenViewEvent}
      />
      <VirtualPet />
    </div>
  );
};

export default EmotionGraphPage;
