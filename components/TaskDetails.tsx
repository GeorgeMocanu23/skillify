import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Button } from '@mui/material'
import EditUserModal from '../helper/EditUserModal'
import { tasksItems } from '../data/tasksItems'
import DeleteUserModal from '../helper/DeleteUserModal'

function TaskDetails({ description, startDate, dueDate, status, id }) {
  const [isModalEditOpen, setModalEditOpen] = useState(false)
const [isModalDeleteOpen, setModalDeleteOpen] = useState(false)

  const handleOpenModalEdit = () => {
    setModalEditOpen(true)
  }

  const handleOpenModalDelete = () => {
    setModalDeleteOpen(true)
  }

  return (
    <Typography>
      {`Description: ${description}`}
      <br />
      <Typography
        sx={{
          color:
            (new Date(dueDate).getTime() - new Date().getTime()) /
              (2 * 24 * 60 * 60 * 1000) <= 1 &&
              status === 'In Progress' || status === 'Overdue' ? 'red' :
              (new Date(dueDate).getTime() - new Date().getTime()) /
                (4 * 24 * 60 * 60 * 1000) <= 1 &&
                status === 'In Progress' ? 'orange' : 'green',
        }}
      >
        {`Start Date: ${startDate}`}
        <br />
        {`Due Date: ${dueDate}`}
      </Typography>
      {/* Add other relevant information about the task */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenModalEdit}
          style={{
            textTransform: 'none',
            marginRight: '10px'
          }}
        >
          Edit Task
          <ModeEditIcon style={{ fontSize: '20px', marginLeft: '5px' }} />
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleOpenModalDelete}
          style={{
            textTransform: 'none',
            marginRight: '10px'
          }}
        >
          Delete Task
          <DeleteOutlineIcon style={{ fontSize: '20px', marginLeft: '5px' }} />
        </Button>
      </div>
      <EditUserModal
        open={isModalEditOpen}
        handleClose={() => setModalEditOpen(false)}
        userData={tasksItems[id]}
      />
      <DeleteUserModal
        open={isModalDeleteOpen}
        handleClose={() => setModalDeleteOpen(false)}
        taskItems={tasksItems[id]}
      />
    </Typography>
  )
}

export default TaskDetails