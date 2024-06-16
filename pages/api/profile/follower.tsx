import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getFollower(req, res)
    case 'POST':
      return addFollower(req, res)
    case 'DELETE':
      return deleteFollower(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getFollower = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const follower = await prisma.follower.findMany({
      select: {
        id: true,
        user: true,
        userId: true,
        follower: true,
        followerId: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved follower!",
      follower: JSON.stringify(follower),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addFollower = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, followerId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingFollower = await prisma.follower.findFirst({
      where: {
        userId: parseInt(userId),
        followerId: parseInt(followerId)
      }
    })

    if (existingFollower) {
      return res.status(400).json({ error: 'Follower already exists' })
    }

    const follower = await prisma.follower.create({
      data: {
        userId: parseInt(userId),
        followerId: parseInt(followerId)
      }
    })

    return res.status(200).json({
      success: "Successfully added follower!",
      follower: JSON.stringify(follower),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteFollower = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, followerId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingFollower = await prisma.follower.findFirst({
      where: {
        userId: parseInt(userId),
        followerId: parseInt(followerId)
      }
    })

    if (!existingFollower) {
      return res.status(400).json({ error: 'Follower does not exist' })
    }

    const follower = await prisma.follower.deleteMany({
      where: {
        userId: parseInt(userId),
        followerId: parseInt(followerId)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted follower!",
      follower: JSON.stringify(follower),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}