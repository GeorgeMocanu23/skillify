import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getLike(req, res)
    case 'POST':
      return addLike(req, res)
    case 'DELETE':
      return deleteLike(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getLike = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const like = await prisma.like.findMany({
      select: {
        id: true,
        postId: true,
        userId: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved like!",
      like: JSON.stringify(like),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addLike = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, postId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: parseInt(userId),
        postId: parseInt(postId)
      }
    })

    if (existingLike) {
      return res.status(400).json({ error: 'Like already exists!' })
    }

    const like = await prisma.like.create({
      data: {
        userId: parseInt(userId),
        postId: parseInt(postId)
      }
    })

    return res.status(200).json({
      success: "Successfully added like!",
      like: JSON.stringify(like),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteLike = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, postId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: parseInt(userId),
        postId: parseInt(postId)
      }
    })

    if (!existingLike) {
      return res.status(400).json({ error: 'Like not found!' })
    }

    const like = await prisma.like.delete({
      where: {
        id: existingLike.id
      }
    })

    return res.status(200).json({
      success: "Successfully deleted like!",
      like: JSON.stringify(like),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}