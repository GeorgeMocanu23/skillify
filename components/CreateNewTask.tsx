import { Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
//import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
//import ModeEditIcon from '@mui/icons-material/ModeEdit'
import React from 'react'
import EditUserModal from '../helper/EditUserModal'
import { tasksItems } from '../data/tasksItems'

function CreateNewTask() {
  const isSmallScreen = window.matchMedia('(max-width: 600px)').matches
  const [isModalOpen, setModalOpen] = React.useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <div
      style={{
        marginTop: '7px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Button
        variant="outlined"
        color="success"
        style={{ textTransform: 'none', marginRight: '10px' }}
        onClick={handleOpenModal}
      >
        Add a new task
        <AddCircleOutlineIcon
          style={{
            fontSize: '20px',
            marginLeft: '5px'
          }}
        />
      </Button>
      {/*<Button 
          variant="outlined" 
          color="primary" 
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
        style={{ 
          textTransform: 'none', 
          marginRight: '10px' 
        }}
      >
        Delete Task
        <DeleteOutlineIcon style={{ fontSize: '20px', marginLeft: '5px' }} />
      </Button>*/}
      <EditUserModal
        open={isModalOpen}
        handleClose={() => setModalOpen(false)}
        userData={tasksItems[tasksItems.length - 1]}
      />
    </div>
  )
}

export default CreateNewTask