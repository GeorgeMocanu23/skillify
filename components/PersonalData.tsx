import React, { useState } from 'react'
import {
  Card,
  Typography,
  useMediaQuery,
  Button,
  Divider
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import EditUserModal from '../helper/EditUserModal'
import separateWords from '../lib/separate-words'

function PersonalData({ userInfo }) {
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
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          margin: '1rem',
        }}
      >
        <Typography
          variant='h4'
          style={{
            marginBottom: '1rem'
          }}
        >
          Personal Data
        </Typography>
        {renderUserInfo()}
        <Button
          variant='outlined'
          onClick={handleOpenModal}
          startIcon={<EditIcon />}
          style={{ marginTop: '1rem' }}
        >
          Edit
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

export default PersonalData