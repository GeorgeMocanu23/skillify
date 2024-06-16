import type { NextApiRequest, NextApiResponse } from 'next'
//import { getSession } from 'next-auth/react'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getNotification(req, res)
    case 'POST':
      return addNotification(req, res)
    case 'PUT':
      return updateNotification(req, res)
    case 'DELETE':
      return deleteNotification(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getNotification = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const notification = await prisma.notification.findMany({
      select: {
        id: true,
        content: true,
        status: true,
        createdAt: true,
        userId: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved notification!",
      notification: JSON.stringify(notification),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addNotification = async (req: NextApiRequest, res: NextApiResponse) => {
  const { content, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const notification = await prisma.notification.create({
      data: {
        status: "unread",
        content: content,
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully added notification!",
      notification: JSON.stringify(notification),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateNotification = async (req: NextApiRequest, res: NextApiResponse) => {
  /*const session = await getSession({ req })
  const userId = session?.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }*/

  const { userId, id } = req.body

  try {

    const existingNotification = await prisma.notification.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingNotification) {
      return res.status(400).json({ error: 'Notification not found' })
    }

    const notification = await prisma.notification.update({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      },
      data: {
        status: "readed"
      }
    })

    return res.status(200).json({
      success: "Successfully updated notification!",
      notification: JSON.stringify(notification),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteNotification = async (req: NextApiRequest, res: NextApiResponse) => {
  const {userId, id} = req.body

  try {
    const existingNotification = await prisma.notification.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingNotification) {
      return res.status(400).json({ error: 'Notification not found' })
    }

    const notification = await prisma.notification.delete({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted notification!",
      notification: JSON.stringify(notification),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}