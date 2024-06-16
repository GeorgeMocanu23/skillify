import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getMessage(req, res)
    case 'POST':
      return addMessage(req, res)
    case 'PUT':
      return updateMessage(req, res)
    case 'DELETE':
      return deleteMessage(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  try {
    const message = await prisma.message.findMany({
      select: {
        id: true,
        content: true,
        //status: true,
        //createdAt: true,
        //updatedAt: true,
        //sender: true,
        //receiver: true,
        senderId: true,
        receiverId: true
      },
      where: {
        OR: [
          { receiverId: parseInt(userId) },
          { senderId: parseInt(userId) }
        ]
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved message!",
      message: JSON.stringify(message),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { content, userId, receiverId } = req.body

  try {
    const message = await prisma.message.create({
      data: {
        content,
        status: "UNREAD",
        receiver: { connect: { id: parseInt(receiverId) } },
        sender: { connect: { id: parseInt(userId) } }
      }
    })

    return res.status(200).json({
      success: "Successfully added message!",
      message: JSON.stringify(message),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, messageId, content } = req.body

  try {
    const existingMessage = await prisma.message.findFirst({
      where: {
        id: parseInt(messageId),
        senderId: parseInt(userId)
      }
    })

    if (!existingMessage) {
      return res.status(400).json({ error: 'Message not found' })
    }

    const updateData = {
      content: content || existingMessage.content
    }

    const message = await prisma.message.update({
      where: {
        id: parseInt(messageId)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated message!",
      message: JSON.stringify(message),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, messageId } = req.body

  try {
    const existingMessage = await prisma.message.findFirst({
      where: {
        id: parseInt(messageId),
        OR: [
          { senderId: parseInt(userId) },
          { receiverId: parseInt(userId) }
        ]
      }
    })

    if (!existingMessage) {
      return res.status(400).json({ error: 'Message not found' })
    }

    await prisma.message.delete({
      where: {
        id: parseInt(messageId)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted message!"
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}