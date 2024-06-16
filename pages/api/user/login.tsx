import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Please fill in all the necessary data' })
  }

  try {
    const user = await prisma.users.findFirst({
      where: {
        username,
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const { password: _, ...userWithoutPassword } = user

    return res.status(200).json({
      success: "Successfully logged in!",
      user: JSON.stringify(userWithoutPassword),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }

}