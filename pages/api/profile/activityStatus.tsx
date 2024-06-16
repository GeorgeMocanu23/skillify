import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getActivityStatus(req, res)
    case 'PUT':
      return updateActivityStatus(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getActivityStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  try {
    const activityStatus = await prisma.activityStatus.findFirst({
      select: {
        projects: true,
        inProgressProjects: true,
        completedProjects: true,
        overdueProjects: true,
        tasks: true,
        inProgressTasks: true,
        completedTasks: true,
        overdueTasks: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    if (!activityStatus) {
      return res.status(404).json({ error: 'Activity Status not found' })
    }

    return res.status(200).json({
      success: "Successfully retrieved activityStatus!",
      activityStatus: JSON.stringify(activityStatus)
    })

  } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateActivityStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, context, status } = req.body

  const validContexts = ['projects', 'tasks']
  const validStatuses = ['IN_PROGRESS', 'COMPLETED', 'OVERDUE']

  if (!validContexts.includes(context) || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid context or status' })
  }

  try {
    const existingActivityStatus = await prisma.activityStatus.findFirst({
      where: {
        userId: parseInt(userId)
      }
    })

    if (!existingActivityStatus) {
      return res.status(404).json({ error: 'Activity Status not found' })
    }

    const updateData: any = {}

    if (context === 'projects') {
      if (status === 'IN_PROGRESS') {
        updateData.projects = { increment: 1 }
        updateData.inProgressProjects = { increment: 1 }
      } else if (status === 'COMPLETED') {
        updateData.inProgressProjects = { decrement: 1 }
        updateData.completedProjects = { increment: 1 }
      } else if (status === 'OVERDUE') {
        updateData.overdueProjects = { increment: 1 }
        updateData.inProgressProjects = { decrement: 1 }
      }
    } else if (context === 'tasks') {
      if (status === 'IN_PROGRESS') {
        updateData.tasks = { increment: 1 }
        updateData.inProgressTasks = { increment: 1 }
      } else if (status === 'COMPLETED') {
        updateData.inProgressTasks = { decrement: 1 }
        updateData.completedTasks = { increment: 1 }
      } else if (status === 'OVERDUE') {
        updateData.overdueTasks = { increment: 1 }
        updateData.inProgressTasks = { decrement: 1 }
      }
    }

    const updatedActivityStatus = await prisma.activityStatus.update({
      where: {
        userId: parseInt(userId)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated activityStatus!",
      activityStatus: updatedActivityStatus
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}