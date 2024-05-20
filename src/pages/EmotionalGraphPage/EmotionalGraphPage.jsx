import React, { useState, useEffect } from 'react';
import DrawerFilter from './DrawerFilter';
import EmotionalChart from './EmotionalChart';
import staticEvents from './testData.json';

localStorage.setItem('events', JSON.stringify(staticEvents));

const EmotionalGraphPage = () => {
  const [filters, setFilters] = useState({
    Joy: true,
    Surprise: true,
    Sadness: true,
    Anger: true,
    Fear: true,
    Love: true,
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem('events')) ?? []);
  }, [])

  return (
    <div>
      <DrawerFilter filters={filters} setFilters={setFilters} />
      <EmotionalChart events={events}/>
    </div>
  );
};

export default EmotionalGraphPage;
