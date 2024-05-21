import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ConfirmDeleteEvent = ({ event, onClose, onDelete }) => {
  const hadleDeleteEvent = () => onDelete(event);
  return (
    <>
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
    </>
  );
};

export default ConfirmDeleteEvent;
