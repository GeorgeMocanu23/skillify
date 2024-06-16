import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import DateCalendarBasic from '../components/DateCalendarBasic'
import CircularProgressWithLabel from '../components/CircularProgressWithLabel'
import TasksList from '../components/TasksList'
import ControlledAccordionTasks from '../components/ControlledAccordionTasks'
import UserProfile from '../components/UserProfile'
import Sidebar from '../components/Sidebar'
import { tasksItems } from '../data/tasksItems'
import Topbar from '../components/Topbar'
import styles from '../public/css/global.module.css'
import UpdateUserProfile from '../components/UpdateUserProfile'
import { userInfo } from '../data/userInfo'
import CreateNewTask from '../components/CreateNewTask'
import FriendsList from '../components/FriendsList'
import Messages from '../components/Messages'
import CustomisedTimeline from '../components/CustomisedTimeLine'
import ProjectsList from '../components/ProjectsList'
import PersnalData from '../components/PersonalData'
import { useSession } from 'next-auth/react'
import NotSignedIn from '../components/auth/NotSignedIn'

function HomePage() {
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [selectedOption, setSelectedOption] = useState('Dashboard')
  const completedTasks = tasksItems.filter((task) => task.status === 'Completed')
  const completionPercentage = (completedTasks.length / tasksItems.length) * 100
  const { data: session } = useSession()

  if (!session) {
    return (
      <NotSignedIn />
    )
  }

  const renderContent = () => {
    switch (selectedOption) {
      case 'Dashboard':
        return (
          <div style={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'center',
          }}>
            <TasksList />
            <DateCalendarBasic />
            <CircularProgressWithLabel value={completionPercentage} />
          </div>
        )
      case 'Calendar':
        return (
          <div style={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'center',
          }}>
            <DateCalendarBasic />
            <CustomisedTimeline />
          </div>
        )
      case 'My Tasks':
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/*<TasksList />*/}
            <CreateNewTask />
            <ControlledAccordionTasks />
          </div>
        )
      case 'Settings':
        return (
          <div>
            <UpdateUserProfile userInfo={userInfo[0]} />
          </div>
        )
      case 'Friends':
        return (
          <FriendsList userInfo={userInfo} />
        )
      case 'Messages':
        return (
          <Messages />
        )
      case 'Projects':
        return (
          <>
            <ProjectsList userInfo={userInfo[0]} />
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Box
        style={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
        }}
      >
        <Sidebar onSelectOption={setSelectedOption} />
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            marginLeft: isSmallScreen ? '0' : '5px',
            marginRight: isSmallScreen ? '0' : '5px',
          }}
        >
          <Topbar tasksItems={tasksItems} />
          <Box
            
          >
            {renderContent()}
          </Box>
        </Box>
        <Box style={{ flex: '0.4', margin: isSmallScreen ? '5px' : '0' }}>
          <UserProfile />
        </Box>
      </Box>
    </>
  )
}

export default HomePage