import React from 'react'
import CircularProgress, {
  CircularProgressProps
} from '@mui/material/CircularProgress'
import { tasksItems } from '../data/tasksItems'
import {
  Box,
  Card,
  CardContent,
  useMediaQuery,
  Typography
} from '@mui/material'
import styles from '../public/css/global.module.css'

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const completedTasksList =
    tasksItems.filter((task) => task.status === 'Completed')
  const tasksCompleted = completedTasksList.length

  return (
    <>
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
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                style={{ color: 'green' }}
                variant="determinate"
                {...props}
                size="100px"
                thickness={3}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                  style={{
                    textAlign: 'center'
                  }}
                >
                  {`${Math.round(props.value)}%`}
                  <br />
                  Completed
                </Typography>
              </Box>
            </Box>
            <Box style={{ margin: '5px', textAlign: 'center' }}>
              <Typography>
                {tasksCompleted} / {tasksItems.length} tasks
              </Typography>
            </Box>
          </Box>
        </CardContent >
      </Card>
    </>
  )
}

export default CircularProgressWithLabel