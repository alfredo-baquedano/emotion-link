import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import emotionsData from '../../contants/emotions.json';
import dayjs from 'dayjs';

const getEmotionArray = (obj) => {
  const result = [];
  const recurse = (currentObj) => {
    if (currentObj.name !== 'none') result.push(currentObj);
    if (currentObj.children && Array.isArray(currentObj.children)) {
      currentObj.children.forEach((child) => recurse(child));
    }
  };
  recurse(obj);
  return result;
};

const emotions = getEmotionArray(emotionsData);

const hexToRgb = (hex) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r, g, b };
};

const rgbToHex = (r, g, b) => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

const getAverageColor = (colors) => {
  const total = colors.length;
  const rgbValues = colors.map((color) => hexToRgb(color));
  const avgR = Math.round(
    rgbValues.reduce((acc, val) => acc + val.r, 0) / total,
  );
  const avgG = Math.round(
    rgbValues.reduce((acc, val) => acc + val.g, 0) / total,
  );
  const avgB = Math.round(
    rgbValues.reduce((acc, val) => acc + val.b, 0) / total,
  );
  return rgbToHex(avgR, avgG, avgB);
};

const getNeonBorderStyle = (colors) => {
  const color = colors.length > 0 ? getAverageColor(colors) : '#fff';
  return {
    border: `2px solid ${color}`,
    boxShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 20px ${color}`,
  };
};

const VisualizeEvent = ({ event }) => {
  if (!event) return null;

  const {
    date,
    name,
    location,
    participants = [],
    impact,
    emotions: eventEmotions = [],
  } = event;

  const formattedDate = dayjs(date).format('MM/DD/YYYY');

  const filteredEmotions = emotions.filter((emotion) =>
    eventEmotions.includes(emotion.name),
  );

  const emotionColors = filteredEmotions.map((emotion) => emotion.color);

  return (
    <Card sx={{ minWidth: 275, ...getNeonBorderStyle(emotionColors) }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {formattedDate}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        {location && (
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {location}
          </Typography>
        )}
        {participants.length > 0 && (
          <Typography variant='body2'>
            Participants: {participants.join(', ')}
          </Typography>
        )}
        <Typography variant='body2'>Impact: {impact}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
          {filteredEmotions.map((emotion) => (
            <Chip
              key={emotion.name}
              label={emotion.displayName}
              sx={{
                backgroundColor: emotion.color,
                color: '#000',
                m: 0.5,
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default VisualizeEvent;
