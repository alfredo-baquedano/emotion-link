import { useState, useEffect } from 'react';
import { Tooltip, Avatar, Box } from '@mui/material';

const adviceList = [
  'Remember to take deep breaths when you feel overwhelmed.',
  'It’s okay to feel sad sometimes, allow yourself to feel it.',
  'Gratitude can improve your mood.',
  'Talking to a friend can help you feel better.',
  'Regular exercise can reduce stress.',
  'Cheer up!',
  'Poppi popii popipo 🎵',
  'Remember that to unlock more emotions you can do your daily missions.',
  'You can use the filters to search for specific events or emotions.',
  'Your progress bar will fill up as you complete more missions.',
];

const VirtualPet = ({ petImage }) => {
  const [advice, setAdvice] = useState('');
  const zIndex = 1250;

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
    <Box sx={{ position: 'fixed', right: 120, bottom: 20, zIndex }}>
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
            zIndex,
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
            zIndex,
          }}
          onClick={handlePetClick}
        />
      </Tooltip>
    </Box>
  );
};

export default VirtualPet;
