import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getPost(req, res)
    case 'POST':
      return addPost(req, res)
    case 'PUT':
      return updatePost(req, res)
    case 'DELETE':
      return deletePost(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const post = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved post!",
      post: JSON.stringify(post),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content, status, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const post = await prisma.post.create({
      data: {
        title: title || '',
        content,
        status,
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully created post!",
      post: JSON.stringify(post),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, content, status, userId } = req.body

  //must check if the logged user is the same as the userId

  const existingPost = await prisma.post.findFirst({
    where: {
      id: parseInt(id),
      userId: parseInt(userId)
    }
  })

  if (!existingPost) {
    return res.status(400).json({ error: 'Post not found or you are not authorized to update this post' })
  }

  const updateData = {
    title: title || existingPost.title,
    content: content || existingPost.content,
    status: status || existingPost.status,
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated post!",
      post: JSON.stringify(post),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  //must check if the logged user is the same as the userId

  const existingPost = await prisma.post.findFirst({
    where: {
      id: parseInt(id),
      userId: parseInt(userId)
    }
  })

  if (!existingPost) {
    return res.status(400).json({ error: 'Post not found or you are not authorized to delete this post' })
  }

  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted post!",
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}