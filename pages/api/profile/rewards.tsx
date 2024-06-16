import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

/*
model reward {
  id          Int       @id @default(autoincrement())
  title       String
  description String
  points      Int
  user        users     @relation(fields: [userId], references: [id])
  userId      Int
}
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getReward(req, res)
    case 'POST':
      return addReward(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getReward = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const reward = await prisma.reward.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        points: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved reward!",
      reward: JSON.stringify(reward),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addReward = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, points, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const reward = await prisma.reward.create({
      data: {
        title: title,
        description: description,
        points: parseInt(points),
        user: {
          connect: { id: parseInt(userId) }
        }
      }
    })

    return res.status(200).json({
      success: "Successfully added reward!",
      reward: JSON.stringify(reward),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}