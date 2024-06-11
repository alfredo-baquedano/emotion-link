import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { getEventNeonBorderStyle } from '@/utils/styling';

const ConfirmDeleteEvent = ({ event, onClose, onDelete }) => {
  const hadleDeleteEvent = () => onDelete(event);
  return (
    <Box sx={{ ...getEventNeonBorderStyle(event) }}>
      <DialogTitle>Delete Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this event?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={hadleDeleteEvent} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Box>
  );
};

export default ConfirmDeleteEvent;
