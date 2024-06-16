import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Paper, TextField, Typography } from '@mui/material'

function Register() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
  })
  const [error, setError] = useState('')
  const [samePassword, setSamePassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    if (user.password !== samePassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = await response.json()
    setLoading(false)
    if (response.ok) {
      router.push('/login')
    } else {
      setError(data.error)
    }
  }

  return (
    <div>
      <Paper
        style={{
          width: '90%',
          maxWidth: '400px',
          padding: '16px',
          margin: 'auto',
          textAlign: 'center',
          marginTop: '10px',
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
          Register
        </Typography>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={user.email}
          variant="outlined"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          value={user.firstName}
          variant="outlined"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <TextField
          id="lastName"
          label="Last Name"
          name="lastName"
          value={user.lastName}
          variant="outlined"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <TextField
          id="username"
          label="Username"
          name="username"
          value={user.username}
          variant="outlined"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <TextField
          id="password"
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <TextField
          id="samePassword"
          label="Confirm Password"
          name="samePassword"
          variant="outlined"
          type="password"
          value={samePassword}
          onChange={(e) => setSamePassword(e.target.value)}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        {error &&
          <Typography
            style={{
              color: 'red',
              marginBottom: '8px'
            }}
          >
            {error}
          </Typography>}
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          style={{ textTransform: 'none' }}
        >
          Register
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push('/login')}
          style={{ textTransform: 'none' }}
        >
          Login to existing account
        </Button>
      </Paper>
    </div>
  )
}

export default Register