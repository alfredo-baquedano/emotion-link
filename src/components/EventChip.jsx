import { Chip, useTheme } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { getEventEmotionColors } from '@/utils/styling';

const EventChip = ({ event, ...props }) => {
  const { palette } = useTheme();
  const [primaryColor, secondaryColor] = getEventEmotionColors(event);
  const contrastText = palette?.getContrastText(primaryColor) ?? '#000';
  return (
    <div style={{ display: 'inline-block' }}>
      <Chip
        {...props}
        sx={{
          ...props.sx,
          backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})`,
          color: contrastText,
        }}
        deleteIcon={<CancelRoundedIcon style={{ color: contrastText }} />}
        label={event.name}
      />
    </div>
  );
};

export default EventChip;
