import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { Button, Paper, TextField, Typography } from '@mui/material'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubmit() {
    const response = await signIn('credentials', {
      redirect: false,
      username,
      password,
    })

    if (response.ok) {
      router.push('/')
    } else {
      setError('Invalid username or password')
    }
  }

  if (session) {
    router.push('/')
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
          marginTop: '50px',
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
          Login
        </Typography>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleSubmit}
          style={{ textTransform: 'none' }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push('/register')}
          style={{ textTransform: 'none' }}
        >
          Create a new account
        </Button>
      </Paper>
    </div>
  )
}