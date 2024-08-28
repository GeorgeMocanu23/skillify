import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getFriendship(req, res)
    case 'POST':
      return addFriendship(req, res)
    case 'DELETE':
      return deleteFriendship(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getFriendship = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const friendship = await prisma.friendship.findMany({
      select: {
        id: true,
        userId: true,
        friendId: true
      },
      where: {
        OR: [
          { userId: parseInt(userId) },
          { friendId: parseInt(userId) }
        ]
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved friendship!",
      friendship: JSON.stringify(friendship),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addFriendship = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, friendId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        userId: parseInt(userId),
        friendId: parseInt(friendId)
      }
    })

    if (existingFriendship) {
      return res.status(400).json({ error: 'Friendship already exists' })
    }

    const existingUser = await prisma.users.findFirst({
      where: {
        id: parseInt(friendId)
      }
    })

    if (!existingUser) {
      return res.status(400).json({ error: 'User not found' })
    }

    const friendship = await prisma.friendship.create({
      data: {
        userId: parseInt(userId),
        friendId: parseInt(friendId)
      }
    })

    return res.status(200).json({
      success: "Successfully added friendship!",
      friendship: JSON.stringify(friendship),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteFriendship = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, friendId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        userId: parseInt(userId),
        friendId: parseInt(friendId)
      }
    })

    if (!existingFriendship) {
      return res.status(400).json({ error: 'Friendship not found' })
    }

    const friendship = await prisma.friendship.deleteMany({
      where: {
        userId: parseInt(userId),
        friendId: parseInt(friendId)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted friendship!",
      friendship: JSON.stringify(friendship),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}