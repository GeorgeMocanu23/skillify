import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Typography,
  Card,
  Button,
  useMediaQuery,
  styled,
  Avatar
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {signOut} from 'next-auth/react'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

function UserProfile() {
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const router = useRouter()

  const [user, setUser] = useState({
    id: 1,
    name: 'George Mocanu',
    username: 'MrGEO',
    password: '123456',
    email: 'example@example.com',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    createdAt: '2021-10-01',
    tasks: [],
    projects: [],
    friendRequests: [],
    friends: [],
    messages: [],
    rewards: [],
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string
        setUser({ ...user, avatar: result })
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'top',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          height: '97vh',
          borderRadius: '15px',
          overflow: 'auto',
          maxHeight: '100%',
          padding: '1px'
        }}
      >
        <Typography variant="h5" component="h1" style={{ marginTop: '12px' }}>
          {user.name}
        </Typography>
        <Avatar
          src={user.avatar}
          alt="avatar"
          style={{
            width: '155px',
            height: '155px',
            margin: '5px',
            borderRadius: '8px'
          }}
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          style={{ textTransform: 'none' }}
        >
          Change avatar
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        <Button
          variant="outlined"
          style={{ textTransform: 'none', marginTop: '10px' }}
          onClick={() => { router.push('/edit-profile') }}
        >
          Edit profile
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => signOut()}
          style={{
            textTransform: 'none',
            marginTop: '10px'
          }}
        >
          Logout
        </Button>
      </Card>
    </>
  )
}

export default UserProfile