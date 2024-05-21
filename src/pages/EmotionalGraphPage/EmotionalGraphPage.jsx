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
  }, [])

  return (
    <div>
      <DrawerFilter filters={filters} setFilters={setFilters} />
<<<<<<< HEAD
      <EmotionalChart filters={filters} />
=======
      <EmotionalChart events={events}/>
>>>>>>> 73f27883888d93750927ca5d8d2bb257add9b1b0
    </div>
  );
};

export default EmotionalGraphPage;
