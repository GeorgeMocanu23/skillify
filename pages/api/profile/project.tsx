import type { NextApiRequest, NextApiResponse } from 'next'

import formatDate from '../../../lib/format-date'
import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getProject(req, res)
    case 'POST':
      return addProject(req, res)
    case 'PUT':
      return updateProject(req, res)
    case 'DELETE':
      return deleteProject(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query

  //must check if the logged user is the same as the userId

  try {
    const project = await prisma.project.findMany({
      select: {
        title: true,
        description: true,
        status: true,
        startDate: true,
        endDate: true,
        priority: true,
        importance: true,
        visibility: true,
        id: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    const formattedProject = project.map(project => ({
      ...project,
      startDate: formatDate(project.startDate),
      endDate: formatDate(project.endDate)
    }))

    return res.status(200).json({
      success: "Successfully retrieved project!",
      project: formattedProject
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, status, startDate, endDate, priority, importance, userId } = req.body

  //must check if the logged user is the same as the userId

  const convertToISO8601 = (date: string) => {
    const [day, month, year] = date.split('.')
    return new Date(`${year}-${month}-${day}`).toISOString()
  }

  try {
    const existingProject = await prisma.project.findFirst({
      where: {
        userId: parseInt(userId),
        title: title
      }
    })

    if (existingProject) {
      return res.status(400).json({ error: 'Project already exists' })
    }

    const project = await prisma.project.create({
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
      success: "Successfully added project!",
      project: JSON.stringify(project),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, description, status, startDate, endDate, priority, importance, userId } = req.body

  //must check if the logged user is the same as the userId

  const convertToISO8601 = (date: string) => {
    const [day, month, year] = date.split('.')
    return new Date(`${year}-${month}-${day}`).toISOString()
  }

  try {
    const existingProject = await prisma.project.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingProject) {
      return res.status(404).json({
        error: 'Project not found or you do not have permission to update it.'
      })
    }

    const updateData = {
      title: title || existingProject.title,
      description: description || existingProject.description,
      status: status || existingProject.status,
      startDate: startDate ? convertToISO8601(startDate) : existingProject.startDate,
      endDate: endDate ? convertToISO8601(endDate) : existingProject.endDate,
      priority: priority || existingProject.priority,
      importance: importance || existingProject.importance
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated project!",
      project: JSON.stringify(updatedProject),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingProject = await prisma.project.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingProject) {
      return res.status(404).json({
        error: 'Project not found or you do not have permission to delete it.'
      })
    }

    await prisma.project.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted project!",
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}