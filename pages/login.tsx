import Head from "next/head"
import Login from '../components/auth/Login'

function LoginPage() {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </>
  )
}

export default LoginPage