import React, { useState } from 'react';
import DrawerFilter from './DrawerFilter';
import EmotionalChart from './EmotionalChart';

const EmotionalGraphPage = () => {
  const [filters, setFilters] = useState({
    joy: true,
    surprise: true,
    sadness: true,
    anger: true,
    fear: true,
    love: true,
  });

  return (
    <div>
      <DrawerFilter filters={filters} setFilters={setFilters} />
      <EmotionalChart filters={filters} />
    </div>
  );
};

export default EmotionalGraphPage;
