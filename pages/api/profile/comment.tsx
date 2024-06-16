import type { NextApiRequest, NextApiResponse } from 'next'
 
import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getComment(req, res)
    case 'POST':
      return addComment(req, res)
    case 'PUT':
      return updateComment(req, res)
    case 'DELETE':
      return deleteComment(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const comment = await prisma.comment.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: true,
        userId: true,
        post: true,
        postId: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved comment!",
      comment: JSON.stringify(comment),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { content, userId, postId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingPost = await prisma.post.findFirst({
      where: {
        id: parseInt(postId),
        userId: parseInt(userId)
      }
    })

    if (!existingPost) {
      return res.status(400).json({ error: 'Post not found' })
    }

    const comment = await prisma.comment.create({
      data: {
        content: content,
        userId: parseInt(userId),
        postId: parseInt(postId)
      }
    })

    return res.status(200).json({
      success: "Successfully added comment!",
      comment: JSON.stringify(comment),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, content, userId } = req.body

  //must check if the logged user is the same as the userId

  const existingComment = await prisma.comment.findFirst({
    where: {
      id: parseInt(id),
      userId: parseInt(userId)
    }
  })

  if (!existingComment) {
    return res.status(400).json({ error: 'Comment not found or you are not authorized to update this comment' })
  }

  const updateData = {
    content: content || existingComment.content
  }

  try {
    const comment = await prisma.comment.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated comment!",
      comment: JSON.stringify(comment),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  //must check if the logged user is the same as the userId

  const existingComment = await prisma.comment.findFirst({
    where: {
      id: parseInt(id),
      userId: parseInt(userId)
    }
  })

  if (!existingComment) {
    return res.status(400).json({ error: 'Comment not found or you are not authorized to delete this comment' })
  }

  try {
    await prisma.comment.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted comment!",
      comment: JSON.stringify(existingComment),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}