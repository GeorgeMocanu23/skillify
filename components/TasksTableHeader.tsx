import React from 'react'
import { Card, TableSortLabel, Typography } from '@mui/material'

type SortDirection = 'asc' | 'desc'

interface TasksTableHeaderProps {
  sortConfig: {
    key: string
    direction: SortDirection
  };
  onSort: (key: string, direction: SortDirection) => void
}

function TasksTableHeader({ sortConfig, onSort }: TasksTableHeaderProps) {
  return (
    <Card style={{ padding: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flex: '1', justifyContent: 'space-between' }}>
        <Typography variant='h6' style={{ flexBasis: '77%', minWidth: 0 }}>
          <TableSortLabel
            active={sortConfig.key === 'title'}
            direction={sortConfig.key === 'title' ? sortConfig.direction : 'asc'}
            onClick={() => onSort('title', sortConfig.direction)}
          >
            Title
          </TableSortLabel>
        </Typography>
        <Typography variant='h6' style={{ flexBasis: '42%', minWidth: 0 }}>
          <TableSortLabel
            active={sortConfig.key === 'status'}
            direction={sortConfig.key === 'status' ? sortConfig.direction : 'asc'}
            onClick={() => onSort('status', sortConfig.direction)}
          >
            Status
          </TableSortLabel>
        </Typography>
        <Typography variant='h6' style={{ flexBasis: '45%', minWidth: 0 }}>
          <TableSortLabel
            active={sortConfig.key === 'priority'}
            direction={sortConfig.key === 'priority' ? sortConfig.direction : 'asc'}
            onClick={() => onSort('priority', sortConfig.direction)}
          >
            Priority
          </TableSortLabel>
        </Typography>
        <Typography variant='h6' style={{ flexBasis: '45%', minWidth: 0 }}>
          <TableSortLabel
            active={sortConfig.key === 'importance'}
            direction={sortConfig.key === 'importance' ? sortConfig.direction : 'asc'}
            onClick={() => onSort('importance', sortConfig.direction)}
          >
            Importance
          </TableSortLabel>
        </Typography>
      </div>
    </Card>
  )
}

export default TasksTableHeader