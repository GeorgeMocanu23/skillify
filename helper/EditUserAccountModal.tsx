import React from 'react'
import { Box, Modal, Paper, Button } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

function EditUserAccountModal({ open, onClose, onConfirm, onCancel, children }) {

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '40%',
        left: '50%',
        padding: 3
      }}>
        {children}
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: 2
        }}>
          <Button
            sx={{ marginRight: 2, textTransform: 'none' }}
            id='confirm-action'
            variant='contained'
            color='error'
            onClick={onConfirm}
          >
            <DoneIcon fontSize="small" sx={{ marginRight: 1 }} />
            Save
          </Button>
          <Button
            sx={{ textTransform: 'none' }}
            id='cancel-action'
            variant='contained'
            onClick={onCancel}
          >
            <CancelIcon fontSize="small" sx={{ marginRight: 1 }} />
            Cancel
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}

export default EditUserAccountModal