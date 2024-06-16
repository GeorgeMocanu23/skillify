import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, CardContent, Card, useMediaQuery } from '@mui/material'

import { tasksItems } from '../data/tasksItems'

function TasksList() {
  const [tasks, setTasks] = useState([])
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    setTasks(tasksItems)
  }, [])

  return (
    <>
      <Box
        style={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'right'
        }}
      >
        <Card
          style={{
            flex: '1',
            margin: '5px',
            borderRadius: '15px',
            maxWidth: isSmallScreen ? '100%' : '340px',
            maxHeight: isSmallScreen ? '100%' : '340px',
            //boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          }}
          elevation={3}
        >
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              overflow: 'auto',
              maxHeight: '100%',
              padding: '1px'
            }}
          >
            {tasks.map((tasks) => (
              <div key={tasks.id}>
                <Button
                  color={tasks.status === 'Completed' ? 'success' : tasks.status === 'Overdue' ? 'error' : 'warning'}
                  style={{
                    textTransform: 'none',
                  }}
                >
                  <li>{tasks.title}</li>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default TasksList