import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TaskHeader from './TaskHeader'
import TaskDetails from './TaskDetails'
import TasksTableHeader from './TasksTableHeader'
import { tasksItems } from '../data/tasksItems'

interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

function ControlledAccordionTasks() {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [tasks, setTasks] = useState([...tasksItems])
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: '',
    direction: 'asc',
  })

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const sortTasks = (key: string) => {
    const direction = sortConfig.key === key &&
      sortConfig.direction === 'asc' ? 'desc' : 'asc'
    const sorted = [...tasks].sort((a, b) => {
      const aValue = a[key] || ''
      const bValue = b[key] || ''
      return direction === 'asc' ?
        aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    })

    setTasks(sorted)
    setSortConfig({ key, direction })
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <TasksTableHeader sortConfig={sortConfig} onSort={sortTasks} />
      {tasks.map((task) => (
        <Accordion
          key={task.id}
          expanded={expanded === `panel${task.id}`}
          onChange={handleChange(`panel${task.id}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${task.id}bh-content`}
            id={`panel${task.id}bh-header`}
          >
            <TaskHeader {...task} />
          </AccordionSummary>
          <AccordionDetails>
            <TaskDetails {...task} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default ControlledAccordionTasks