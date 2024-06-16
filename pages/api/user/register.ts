import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

import EmailChecker from '../../../helper/EmailChecker'

const SALT_ROUNDS = 10

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, firstName, lastName, username } = req.body

  if (!email || !password || !firstName || !lastName || !username) {
    return res.status(400).json({ error: 'Please fill in all the necessary data' })
  }

  if (!EmailChecker(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  try {
    const existingUserByEmail = await prisma.users.findFirst({
      where: {
        email,
      },
    })

    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const existingUserByUsername = await prisma.users.findFirst({
      where: {
        username,
      }
    })

    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
      },
    })

    await prisma.activityStatus.create({
      data: {
        userId: newUser.id,
        projects: 0,
        inProgressProjects: 0,
        completedProjects: 0,
        overdueProjects: 0,
        tasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
      } as any
    })

    const { password: _, ...userWithoutPasswod } = newUser

    return res.status(201).json({
      success: "Successfully registered!",
      user: JSON.stringify(userWithoutPasswod),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}