import React, { useState, useEffect } from 'react';
import DrawerFilter from './DrawerFilter';
import EmotionalChart from './EmotionalChart';
import staticEvents from './testData.json';

localStorage.setItem('events', JSON.stringify(staticEvents));

const EmotionalGraphPage = () => {
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

  return (
    <div>
      <DrawerFilter filters={filters} setFilters={setFilters} />
      <EmotionalChart events={filteredEvents} />
    </div>
  );
};

export default EmotionalGraphPage;
