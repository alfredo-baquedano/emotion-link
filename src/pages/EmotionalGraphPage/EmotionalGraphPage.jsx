import React, { useState } from 'react';
import DrawerFilter from './DrawerFilter';
import EmotionalChart from './EmotionalChart';

const EmotionalGraphPage = () => {
  const [filters, setFilters] = useState({
    Joy: true,
    Surprise: true,
    Sadness: true,
    Anger: true,
    Fear: true,
    Love: true,
  });

  return (
    <div>
      <DrawerFilter filters={filters} setFilters={setFilters} />
      <EmotionalChart />
    </div>
  );
};

export default EmotionalGraphPage;
