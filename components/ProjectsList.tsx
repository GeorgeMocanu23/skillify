import React, { useState } from 'react'
import { Card, CardContent, Typography, Divider, Button, Paper } from '@mui/material'
import separateWords from '../lib/separate-words'
import AddIcon from '@mui/icons-material/Add'

function ProjectsList({ userInfo }) {

  const renderValue = (key, value) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Typography key={index}>
          {renderValue(key, item)}
        </Typography>
      ))
    } else if (typeof value === 'object') {
      return Object.entries(value).map(([subKey, subVal]) => (
        subKey !== 'id' && subKey !== 'tasks' && ( // TODO: i will render tasks in a different component
          <Typography key={subKey}>
            <strong>
              {`${separateWords(subKey.charAt(0).toUpperCase() + subKey.slice(1))}: `}
            </strong>
            {renderValue(subKey, subVal)}
          </Typography>
        )
      ))
    } else {
      return value
    }
  }

  const renderUserInfo = () => {
    return Object.entries(userInfo.projects).map(([key, value]) => (
      <Typography key={key}>
        {renderValue(key, value)}
        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* it must be two buttons on the same line */}
          <Button variant='contained' style={{ marginTop: '6px', textTransform: 'none', backgroundColor: 'orange' }}>
            Edit
          </Button>
          <Button variant='contained' style={{ marginTop: '6px', textTransform: 'none', backgroundColor: 'red', marginLeft: '0.1em' }}>
            Delete
          </Button>
          <Button variant='contained' color='primary' style={{ marginTop: '6px', textTransform: 'none', marginLeft: '0.1em' }}>
            Details
          </Button>
        </div>
        <Divider
          style={{
            width: 'auto',
            backgroundColor: 'deepskyblue',
            margin: '0.7em'
          }}
          orientation="horizontal"
        />
      </Typography>
    ))
  }

  return (
    <>
      <Card
        style={{
          margin: '5px',
          borderRadius: '15px',
          maxWidth: '340px',
          maxHeight: '340px',
          overflow: 'auto',
        }}
        elevation={3}
      >
        <CardContent style={{ padding: '1rem' }}>
          <Typography component="div" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
            Projects List
            <Button variant='contained' style={{ margin: '1em', textTransform: 'none', backgroundColor: 'green', marginLeft: '0.1em', justifyContent: 'center' }}>
              <AddIcon fontSize='small' style={{ marginRight: '0.1em' }} />
              New
            </Button>
          </Typography>
          <Divider
            style={{
              width: 'auto',
              backgroundColor: 'deepskyblue',
              margin: '0.5em'
            }}
            orientation="horizontal"
          />
          <Typography component="div" style={{ fontSize: '1rem' }}>
            {renderUserInfo()}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default ProjectsList