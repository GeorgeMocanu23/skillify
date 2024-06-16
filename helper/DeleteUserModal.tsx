import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as DialogButton,
  Typography,
} from '@mui/material'

function DeleteUserModal({ open, handleClose, taskItems }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete task</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this task?</Typography>
        <Typography>{taskItems.title}</Typography>
      </DialogContent>
      <DialogActions>
        <DialogButton
          color='primary'
          onClick={handleClose}
        >
          Cancel
        </DialogButton>
        <DialogButton color='error' onClick={handleClose}>Delete</DialogButton>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteUserModal