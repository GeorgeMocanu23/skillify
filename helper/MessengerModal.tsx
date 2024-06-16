import React from 'react'
import { Box, Modal, Paper, Button } from '@mui/material'

function MessengerModal({ open, onClose, children }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Paper style={{ padding: '10px' }}>
          {children}
        </Paper>
      </Box>
    </Modal>
  )
}

export default MessengerModal