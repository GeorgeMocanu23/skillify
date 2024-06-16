import React from 'react'
import Typography from '@mui/material/Typography'

function TaskHeader({ title, status, priority, importance }) {
  const statusColor = status === 'Completed' ? 'green' : status === 'Overdue' ? 'red' : 'orange'

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flex: '1', justifyContent: 'space-between' }}>
        <Typography style={{ flexBasis: '90%', minWidth: 0 }}>{title}</Typography>
        <Typography style={{ flexBasis: '60%', color: statusColor }}>{status}</Typography>
        <Typography style={{ flexBasis: '70%', minWidth: 0 }}>{priority}</Typography>
        <Typography style={{ flexBasis: '30%' }}>{importance}</Typography>
      </div>
    </>
  )
}

export default TaskHeader