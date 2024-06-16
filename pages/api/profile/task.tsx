import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getTask(req, res)
    case 'POST':
      return addTask(req, res)
    case 'PUT':
      return updateTask(req, res)
    case 'DELETE':
      return deleteTask(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const task = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        startDate: true,
        endDate: true,
        priority: true,
        importance: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved task!",
      task: JSON.stringify(task),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, status, startDate, endDate, priority, importance, userId } = req.body

  //must check if the logged user is the same as the userId

  const convertToISO8601 = (date: string) => {
    const [day, month, year] = date.split('.')
    return new Date(`${year}-${month}-${day}`).toISOString()
  }

  const existingTask = await prisma.task.findFirst({
    where: {
      userId: parseInt(userId),
      title: title
    }
  })

  if (existingTask) {
    return res.status(400).json({ error: 'Task already exists' })
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        startDate: convertToISO8601(startDate),
        endDate: convertToISO8601(endDate),
        priority,
        importance,
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully added task!",
      task: JSON.stringify(task),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, description, status, startDate, endDate, priority, importance, userId } = req.body

  //must check if the logged user is the same as the userId

  const convertToISO8601 = (date: string) => {
    const [day, month, year] = date.split('.')
    return new Date(`${year}-${month}-${day}`).toISOString()
  }

  try {
    const existingTask = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found or unauthorized' })
    }

    const updateData = {
      title: title || existingTask.title,
      description: description || existingTask.description,
      status: status || existingTask.status,
      startDate: startDate ? convertToISO8601(startDate) : existingTask.startDate,
      endDate: endDate ? convertToISO8601(endDate) : existingTask.endDate,
      priority: priority || existingTask.priority,
      importance: importance || existingTask.importance,
    }

    const task = await prisma.task.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated task!",
      task: JSON.stringify(task),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  try {
    const existingTask = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found or unauthorized' })
    }

    await prisma.task.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json({ success: 'Successfully deleted task!' })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}