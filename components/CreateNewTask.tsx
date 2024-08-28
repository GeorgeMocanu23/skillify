import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditUserModal from '../helper/EditUserModal'
import { useSession } from "next-auth/react"

function CreateNewTask({ type }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const { data: session } = useSession()
  const [item, setItem] = useState({
    title: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    priority: '',
    importance: '',
    visibility: ''
  })

  const handleOpenModal = () => {
    setModalOpen(true)
    console.log('session.user.id:', session.user.id)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleSaveItem = async (updatedItem) => {

    const itemWithUserId = { ...updatedItem, userId: session.user.id }

    try {
      const response = await fetch(`/api/profile/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemWithUserId),
      })

      const data = await response.json()
      if (response.ok) {
        setItem(data[type])
        console.log('task:', data[type])
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error('Error adding ', error)
    }
    handleCloseModal()
  }

  return (
    <div style={{ marginTop: '7px', display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="outlined"
        color="success"
        style={{ textTransform: 'none', marginRight: '10px' }}
        onClick={handleOpenModal}
      >
        Add a new...
        <AddCircleOutlineIcon style={{ fontSize: '20px', marginLeft: '5px' }} />
      </Button>
      <EditUserModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        taskData={item}
        onSave={handleSaveItem}
      />
    </div>
  )
}

export default CreateNewTask
