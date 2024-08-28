import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Button } from '@mui/material'
import EditUserModal from '../helper/EditUserModal'
import DeleteUserModal from '../helper/DeleteUserModal'

function TaskDetails({ title, description, startDate, endDate, status, id, onEditTask, onDeleteTask }) {
  const [isModalEditOpen, setModalEditOpen] = useState(false)
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [editTaskData, setEditTaskData] = useState({
    title,
    description,
    startDate,
    endDate,
    status,
    id,
  })

  const handleOpenModalEdit = () => {
    setEditTaskData({ title, description, startDate, endDate, status, id })
    setModalEditOpen(true)
  }

  const handleOpenModalDelete = () => {
    setModalDeleteOpen(true)
  }

  const handleEditTask = (updatedTask) => {
    onEditTask(id, updatedTask)
    setModalEditOpen(false)
  }

  const handleDeleteTask = () => {
    onDeleteTask(id)
    setModalDeleteOpen(false)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).replace(/\//g, '.')
  }

  return (
    <>
      <Typography component="div">
        {`Description: ${description}`}
        <br />
        <Typography
          component="div"
          sx={{
            color:
              (new Date(endDate).getTime() - new Date().getTime()) /
                (2 * 24 * 60 * 60 * 1000) <= 1 &&
                status === 'In Progress' || status === 'Overdue' ? 'red' :
                (new Date(endDate).getTime() - new Date().getTime()) /
                  (4 * 24 * 60 * 60 * 1000) <= 1 &&
                  status === 'In Progress' ? 'orange' : 'green',
          }}
        >
          {`Start Date: ${formatDate(startDate)}`}
          <br />
          {`Due Date: ${formatDate(endDate)}`}
        </Typography>
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
          taskData={editTaskData}
          onSave={handleEditTask}
        />
        <DeleteUserModal
          open={isModalDeleteOpen}
          handleClose={() => setModalDeleteOpen(false)}
          onDelete={handleDeleteTask}
          taskItems={{ title: title }}
        />
      </Typography>
    </>
  )
}

export default TaskDetails
