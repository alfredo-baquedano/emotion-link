import { useState, forwardRef, useEffect } from 'react';
import {
  Autocomplete,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Tooltip,
  Grow,
  Slide,
} from '@mui/material';
import {
  Close as CloseIcon,
  Check as CheckIcon,
  DonutSmall as DonutSmallIcon,
  RemoveDone as RemoveDoneIcon,
} from '@mui/icons-material';
import { useUser } from '@/contexts/UserContext';
import { getEmotionList, getTooltipText } from '@/utils/emotions';
import EmotionWheel from '@/components/charts/EmotionWheel';

const Transition = forwardRef((props, ref) => (
  <Slide direction='up' ref={ref} {...props} />
));

const emotionList = getEmotionList();

const EmotionSelect = ({ name, onChange, value = [], options, ariaLabel }) => {
  const [currentEmotions, setCurrentEmotions] = useState([]);
  const [openEmotionWheel, setOpenEmotionWheel] = useState(false);
  const handleOpenEmotionWheel = () => setOpenEmotionWheel(true);
  const handleCloseEmotionWheel = () => setOpenEmotionWheel(false);
  const { getLevel } = useUser();
  const userLevel = getLevel();

  const handleClearEmotions = () =>
    onChange({
      target: {
        name,
        value: [],
      },
    });

  const handleChange = (newValue) => {
    setCurrentEmotions(newValue);
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  useEffect(() => {
    setCurrentEmotions(value);
  }, [value]);

  return (
    <>
      <Autocomplete
        sx={{ mt: 2 }}
        multiple
        fullWidth
        disableCloseOnSelect
        value={currentEmotions}
        options={(options ?? emotionList).sort(
          (a, b) => Number(a.level > userLevel) - Number(b.level > userLevel),
        )}
        popupIcon={false}
        onChange={(event, newValue) => handleChange(newValue)}
        getOptionLabel={(option) => option.displayName}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option.name}
              label={option.displayName}
              style={{
                backgroundColor: option.color,
                color: '#000',
              }}
            />
          ))
        }
        renderOption={(props, option) => (
          <Tooltip
            describeChild
            title={`${option.description}${getTooltipText(option, userLevel)}`}
            placement='top'
            arrow
          >
            <div style={{ display: 'inline-block' }}>
              <Chip
                {...props}
                key={option.name}
                label={option.displayName}
                disabled={option.level > userLevel}
                style={{
                  margin: '3px',
                  borderWidth: 1,
                  display: 'inline-block',
                  backgroundColor: option.color,
                  color: '#000',
                }}
              />
            </div>
          </Tooltip>
        )}
        renderInput={(params) => (
          <Box sx={{ position: 'relative' }}>
            <TextField
              {...params}
              label='Emotions'
              aria-label={ariaLabel ?? ''}
              name={name}
              inputProps={{
                ...params.inputProps,
              }}
            ></TextField>
            <Tooltip title='Open emotion wheel' arrow placement='top'>
              <IconButton
                aria-label='Open emotion wheel'
                sx={{ position: 'absolute', right: 4, top: 8 }}
                onClick={handleOpenEmotionWheel}
              >
                <DonutSmallIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        isOptionEqualToValue={(option, value) => option.name === value.name}
      />
      <Dialog
        fullScreen
        open={openEmotionWheel}
        keepMounted
        onClose={handleCloseEmotionWheel}
        TransitionComponent={Transition}
      >
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleCloseEmotionWheel}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Select Emotions
            </Typography>
            <Button
              sx={{ mr: 2 }}
              variant='outlined'
              startIcon={<RemoveDoneIcon />}
              onClick={handleClearEmotions}
            >
              Clear
            </Button>
            <Button
              variant='contained'
              startIcon={<CheckIcon />}
              onClick={handleCloseEmotionWheel}
            >
              Select {value.length > 0 ? `(${value.length + 1})` : ''}
            </Button>
          </Toolbar>
        </AppBar>
        <Grow in={openEmotionWheel}>
          <DialogContent
            sx={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <EmotionWheel value={currentEmotions} onSelect={handleChange} />
          </DialogContent>
        </Grow>
      </Dialog>
    </>
  );
};

export default EmotionSelect;
