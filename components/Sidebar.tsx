import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,
  Typography,
  Button,
  ListItemIcon
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'
import GroupIcon from '@mui/icons-material/Group'
import ForumIcon from '@mui/icons-material/Forum'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ReportIcon from '@mui/icons-material/Report'
import SettingsIcon from '@mui/icons-material/Settings'

function Sidebar({ onSelectOption }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon /> },
    { label: 'Projects', icon: <DescriptionIcon /> },
    { label: 'My Tasks', icon: <AssignmentIcon /> },
    { label: 'Calendar', icon: <CalendarMonthIcon /> },
    { label: 'Time management', icon: <ManageHistoryIcon /> },
    { label: 'Friends', icon: <GroupIcon /> },
    { label: 'Messages', icon: <ForumIcon /> },
    { label: 'Rewards', icon: <EmojiEventsIcon /> },
    { label: 'Reports', icon: <ReportIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> },
  ]

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleItemClick = (item) => {
    onSelectOption(item.label)
    setIsDrawerOpen(false)
  }

  return (
    <>
      {/* Button for Small Devices */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="toggle sidebar"
          onClick={handleDrawerToggle}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Drawer for Medium Devices */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, height: '97vh' }}>
        {isDrawerOpen ? (
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <List>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  style={{
                    display: 'block',
                    textTransform: 'none',
                    marginBottom: '-10px',
                    marginLeft: '-10px'
                  }}
                >
                  <ListItem>
                    {item.icon}
                    <ListItemText
                      primary={item.label}
                      style={{ marginLeft: '5px' }}
                    />
                  </ListItem>
                </Button>
              ))}
            </List>
          </Drawer>
        ) : (
          <Card
            style={{
              maxWidth: '180px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '15px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              backgroundColor: '',
              overflow: 'auto',
              maxHeight: '100%',
              padding: '1px',
            }}
            //elevation={3}
          >
            <Typography
              variant="h5"
              sx={{
                p: 1,
                textAlign: 'center',
                letterSpacing: '.2rem',
                fontFamily: 'cursive',
              }}
            >
              Skillify
            </Typography>
            <List sx={{ flexGrow: 1 }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  style={{
                    display: 'block',
                    textTransform: 'none',
                    marginBottom: '-10px',
                    marginLeft: '-10px'
                  }}
                >
                  <ListItem>
                    {item.icon}
                    <ListItemText
                      primary={item.label}
                      style={{ marginLeft: '5px' }}
                    />
                  </ListItem>
              </Button>
              ))}
            </List>
          </Card>
        )}
      </Box>
    </>
  )
}

export default Sidebar