import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import DateCalendarBasic from '../components/DateCalendarBasic';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import TasksList from '../components/TasksList';
import ControlledAccordionTasks from '../components/ControlledAccordionTasks';
import UserProfile from '../components/UserProfile';
import Sidebar from '../components/Sidebar';
import { useFetchTasks } from '../data/UserTasks';
import Topbar from '../components/Topbar';
import UpdateUserProfile from '../components/UpdateUserProfile';
import { userInfo } from '../data/userInfo';
import CreateNewItem from '../components/CreateNewTask';
import FriendsList from '../components/FriendsList';
import Messages from '../components/Messages';
import CustomisedTimeline from '../components/CustomisedTimeLine';
import ProjectsList from '../components/ProjectsList';
import PersnalData from '../components/PersonalData';
import { useSession } from 'next-auth/react';
import NotSignedIn from '../components/auth/NotSignedIn';
import InfiniteScroll from '../components/InfiniteScroll';

function HomePage() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const { tasksItems = [] } = useFetchTasks();
  const completedTasks = tasksItems.filter((task) => task.status === 'COMPLETED');
  const completionPercentage = tasksItems.length > 0 ? (completedTasks.length / tasksItems.length) * 100 : 0;
  const { data: session } = useSession();

  if (!session) {
    return <NotSignedIn />;
  }

  const renderContent = () => {
    switch (selectedOption) {
      case 'Dashboard':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              justifyContent: 'center',
              //gap: '16px',
              //padding: '16px',
              flexGrow: 1,
            }}
          >
            <TasksList />
            <DateCalendarBasic />
            <CircularProgressWithLabel value={completionPercentage} />
          </Box>
        );
      case 'Network':
        return <InfiniteScroll />;
      case 'Calendar':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              justifyContent: 'center',
              gap: '16px',
              padding: '16px',
              flexGrow: 1,
            }}
          >
            <DateCalendarBasic />
            <CustomisedTimeline />
          </Box>
        );
      case 'My Tasks':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              flexGrow: 1,
            }}
          >
            <CreateNewItem />
            <ControlledAccordionTasks type="task" />
          </Box>
        );
      case 'Settings':
        return (
          <Box
            sx={{
              padding: '16px',
              flexGrow: 1,
            }}
          >
            <UpdateUserProfile userInfo={userInfo[0]} />
          </Box>
        );
      case 'Friends':
        return (
          <Box
            sx={{
              padding: '16px',
              flexGrow: 1,
            }}
          >
            <FriendsList userInfo={userInfo} />
          </Box>
        );
      case 'Messages':
        return (
          <Box
            sx={{
              padding: '16px',
              flexGrow: 1,
            }}
          >
            <Messages />
          </Box>
        );
      case 'Projects':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              flexGrow: 1,
            }}
          >
            <CreateNewItem type="project" />
            <ControlledAccordionTasks type="project" />
          </Box>
        );
      case 'Time management':
        return null;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        height: '100vh',
      }}
    >
      <Sidebar onSelectOption={setSelectedOption} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginLeft: isSmallScreen ? '0' : '5px',
          marginRight: isSmallScreen ? '0' : '5px',
        }}
      >
        <Topbar tasksItems={tasksItems} />
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          {renderContent()}
        </Box>
      </Box>
      {/* {!isSmallScreen && (*/}
        <Box
          sx={{
            //flex: '0.5',
            margin: '0px',
            height: '97vh',
          }}
        >
          <UserProfile />
        </Box>
      {/* })} */}
    </Box>
  );
}

export default HomePage;
