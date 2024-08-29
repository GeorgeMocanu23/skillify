import React, { useState } from 'react'
import { Card, Typography, useMediaQuery, Button, Divider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import EditUserModal from '../helper/EditUserModal'
import separateWords from '../lib/separate-words'

function UpdateUserProfile({ userInfo }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [isModalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Typography key={index}>
          {renderValue(item)}
        </Typography>
      ))
    } else if (typeof value === 'object') {
      return Object.entries(value).map(([key, val]) => (
        <Typography key={key}>
          <strong>
            {`${separateWords(key.charAt(0).toUpperCase() + key.slice(1))}: `}
          </strong>
          {renderValue(val)}
        </Typography>
      ))
    } else {
      return value
    }
  }

  const renderUserInfo = () => {
    return Object.entries(userInfo).map(([key, value]) => (
      <Typography key={key}>
        <strong>
          {`${separateWords(key.charAt(0).toUpperCase() + key.slice(1))}: `}
        </strong>
        {renderValue(value)}
        <Divider
          style={{
            width: 'auto',
            backgroundColor: 'deepskyblue',
            margin: '0.3rem'
          }}
          orientation="horizontal"
        />
      </Typography>
    ))
  }

  return (
    <>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0.5rem',
          borderRadius: '1rem',
          width: '94%',
          maxHeight: isSmallScreen ? '100%' : '28.2rem',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          padding: '1rem',
          overflow: 'auto',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          style={{
            marginTop: '0.1rem',
            margin: 'auto',
            fontWeight: 'bold'
          }}
        >
          Your account info
        </Typography>
        {renderUserInfo()}
        <Button
          variant="contained"
          component="label"
          style={{ textTransform: 'none' }}
          onClick={handleOpenModal}
        >
          <EditIcon style={{ marginRight: '0.3rem' }} />
          Edit your account info
        </Button>
      </Card>
      <EditUserModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        taskData={userInfo}
        onSave={handleCloseModal}
      />
    </>
  )
}

export default UpdateUserProfile