import React from 'react'
import { Button, Paper, Typography } from '@mui/material'
import styles from '../../styles/Background.module.css'

function NotSignedIn() {
  return (
    <div style={{ textAlign: 'center' }} className={styles.background}>
      <Paper
        style={{
          width: '90%',
          maxWidth: '400px',
          padding: '16px',
          margin: 'auto',
          textAlign: 'center',
          marginTop: '20px',
        }}
        elevation={4}
      >
        <Typography
          variant="h4"
          align='center'
          style={{
            marginBottom: '10px'
          }}
        >
          You are not signed in
        </Typography>
        <Typography
          variant="body1"
          align='center'
          style={{
            marginBottom: '10px'
          }}
        >
          Please login to access the dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = '/login'
          }}
          style={{ textTransform: 'none' }}
        >
          Sign in
        </Button>
        <Typography
          variant="body1"
          align='center'
          style={{
            marginTop: '10px'
          }}
        >
          Don't have an account?
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            window.location.href = '/register'
          }}
          style={{ textTransform: 'none' }}
        >
          Create a new account
        </Button>
      </Paper>
    </div>
  )
}

export default NotSignedIn