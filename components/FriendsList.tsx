import React, { useState } from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import MessengerModal from '../helper/MessengerModal'
import Messages from '../components/Messages'

function FriendsList({ userInfo }) {
  const { friends } = userInfo[0]
  const [isModalOpen, setModalOpen] = useState(false)


  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        margin: '10px'
      }}
    >
      <Typography
        variant='h4'
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        Friends List
      </Typography>
      {friends.map((friend) => (
        <Button
          key={friend.id}
          onClick={handleOpenModal}
          variant="outlined"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '2px',
            padding: '5px',
            textTransform: 'none',
          }}
        >
          <div
            key={friend.id}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Avatar
              src={friend.avatar}
              alt={friend.name}
              style={{ marginRight: '7px' }}
            />
            <p style={{ margin: 0 }}>{friend.name}</p>
          </div>
        </Button>
      ))}
      <MessengerModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        children={<Messages />}
      />
    </div>
  )
}

export default FriendsList