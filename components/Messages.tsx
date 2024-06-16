import React from 'react'
import { Card, Typography, TextField, Button } from '@mui/material'
import MessageCard from '../components/MessageCard'

function Messages() {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: 'auto'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '16px',
          borderBottom: '1px solid #ccc'
        }}
      >
        <Typography variant='h5'>Messenger</Typography>
      </div>
      <div style={{ flex: '1', overflowY: 'auto', padding: '16px' }}>
        <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
          <MessageCard content='Hello!' backgroundColor='#ccebff' />
          <MessageCard content='How are you?' backgroundColor='#ccebff' />
          <MessageCard
            content='Im doing well, thanks!'
            backgroundColor='#99ff99'
          />
          <MessageCard
            content='What are you up to?'
            backgroundColor='#ccebff'
          />
          <MessageCard
            content='Just working on some projects.'
            backgroundColor='#99ff99'
          />
          <MessageCard
            content='Cool! you schould check out this new project I am working on with some friends from another country. The project is called Skillify and it is a platform for people to share their skills and learn new ones and that is not all, you can also earn rewars for completing tasks and challanges. Now I will tell you all what my project is about: Skillify is a platform for people to share their skills and learn new ones and that is not all, you can also earn rewars for completing tasks and challanges. Now I will tell you all what my project is about: Skillify is a platform for people to share their skills and learn new ones and that is not all, you can also earn rewars for completing tasks and challanges. Now I will tell you all what my project is about: Skillify is a platform for people to share their skills and learn new ones and that is not all, you can also earn rewars for completing tasks and  challanges.'
            backgroundColor='#ccebff'
          />
        </div>
      </div>
      <div style={{ padding: '16px', borderTop: '1px solid #ccc' }}>
        <TextField
          multiline
          rows={4}
          label='Type your message'
          variant='outlined'
          fullWidth
        />
        <Button
          variant='contained'
          color='primary'
          style={{ marginTop: '8px' }}
        >
          Send
        </Button>
      </div>
    </Card>
  )
}

export default Messages