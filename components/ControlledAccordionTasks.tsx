import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TaskHeader from './TaskHeader'
import TaskDetails from './TaskDetails'
import TasksTableHeader from './TasksTableHeader'
import { useSession } from "next-auth/react"

interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

function ControlledAccordionTasks({ type }) {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [items, setItems] = useState([])
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: '',
    direction: 'asc',
  })
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetch(`/api/profile/${type}?userId=${session.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setItems(data[type])
          } else {
            console.error(data.error)
          }
        })
        .catch(error => console.error('Error fetching items:', error))
    }
  }, [session, type])

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const sortItems = (key: string) => {
    const direction = sortConfig.key === key &&
      sortConfig.direction === 'asc' ? 'desc' : 'asc'
    const sorted = [...items].sort((a, b) => {
      const aValue = a[key] || ''
      const bValue = b[key] || ''
      return direction === 'asc' ?
        aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    })

    setItems(sorted)
    setSortConfig({ key, direction })
  }

  const handleEditItem = (itemId: string, updatedItem: any) => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, ...updatedItem } : item
    ))

    const itemWithUserId = { id: itemId, ...updatedItem, userId: session.user.id }

    fetch(`/api/profile/${type}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: itemId, ...itemWithUserId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(`${type} updated successfully:`, data[type])
        } else {
          console.error(data.error)
        }
      })
      .catch(error => console.error(`Error updating ${type}:`, error))
  }

  const handleDeleteItem = async (itemId: string) => {
    const userId = session.user.id

    try {
      const response = await fetch(`/api/profile/${type}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: itemId, userId }),
      })

      const data = await response.json()

      if (response.ok) {
        setItems(items.filter(item => item.id !== itemId))
        console.log(`${type} deleted successfully`)
      } else {
        console.error('Error:', data.error)
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error)
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <TasksTableHeader sortConfig={sortConfig} onSort={sortItems} />
      {items.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === `panel${item.id}`}
          onChange={handleChange(`panel${item.id}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${item.id}bh-content`}
            id={`panel${item.id}bh-header`}
          >
            <TaskHeader {...item} />
          </AccordionSummary>
          <AccordionDetails>
            <TaskDetails
              {...item}
              onEditTask={handleEditItem}
              onDeleteTask={handleDeleteItem}
              type={type}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default ControlledAccordionTasks
