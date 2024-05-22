import React, { useState, useEffect } from 'react';
import { Tooltip, Avatar, Box } from '@mui/material';

const adviceList = [
  'Remember to take deep breaths when you feel overwhelmed.',
  'It’s okay to feel sad sometimes, allow yourself to feel it.',
  'Gratitude can improve your mood.',
  'Talking to a friend can help you feel better.',
  'Regular exercise can reduce stress.',
  'Cheer up!',
  'Poppi popii popipo',
];

const VirtualPet = ({ petImage }) => {
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomAdvice =
        adviceList[Math.floor(Math.random() * adviceList.length)];
      setAdvice(randomAdvice);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePetClick = () => {
    const randomAdvice =
      adviceList[Math.floor(Math.random() * adviceList.length)];
    setAdvice(randomAdvice);
  };

  return (
    <Box sx={{ position: 'fixed', right: 120, bottom: 20 }}>
      <Tooltip
        title={
          <Box
            sx={{
              p: 1,
              fontSize: '1rem',
              fontFamily: 'Arial, sans-serif',
              maxWidth: '200px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {advice}
          </Box>
        }
        placement='top'
        arrow
        open={Boolean(advice)}
        PopperProps={{
          sx: {
            '.MuiTooltip-tooltip': {
              bgcolor: 'white',
              color: 'black',
              borderRadius: '12px',
              boxShadow: 3,
              textAlign: 'center',
            },
            '.MuiTooltip-arrow': {
              color: 'white',
            },
          },
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -10],
              },
            },
          ],
        }}
      >
        <Avatar
          alt='Virtual Pet'
          src={petImage}
          sx={{
            width: 100,
            height: 100,
            cursor: 'pointer',
          }}
          onClick={handlePetClick}
        />
      </Tooltip>
    </Box>
  );
};

export default VirtualPet;
