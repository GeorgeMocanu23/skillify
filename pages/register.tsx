import Head from "next/head"
import Register from '../components/auth/Register'

function RegisterPage() {

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Register />
    </>
  )
}

export default RegisterPage