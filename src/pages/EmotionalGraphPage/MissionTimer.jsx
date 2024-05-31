import { useState, useEffect } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import dayjs from 'dayjs';
import { Tooltip, Typography } from '@mui/material';
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});
dayjs.extend(relativeTime);

const MissionTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(dayjs().to(dayjs().endOf('day')));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tooltip
      arrow
      describeChild
      title={`Complete your missions within the next ${timeLeft}. New missions will be available afterwards.`}
    >
      <Typography style={{ float: 'right' }} variant='caption'>
        {timeLeft} left
      </Typography>
    </Tooltip>
  );
};

export default MissionTimer;
