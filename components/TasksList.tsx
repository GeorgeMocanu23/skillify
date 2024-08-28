import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  CardContent,
  Card,
  useMediaQuery
} from '@mui/material'

import { useSession } from "next-auth/react"

interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

function TasksList() {
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [tasks, setTasks] = useState([])
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: '',
    direction: 'asc',
  })
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetch(`/api/profile/task?userId=${session.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setTasks(data.task)
          } else {
            console.error(data.error)
          }
        })
        .catch(error => console.error('Error fetching tasks:', error))
    }
  }, [session])

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
                  color={
                    tasks.status === 'COMPLETED' ? 'success' :
                      tasks.status === 'OVERDUE' ? 'error' : 'warning'
                  }
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