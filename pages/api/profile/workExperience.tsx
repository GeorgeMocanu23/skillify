import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getWorkExperience(req, res)
    case 'POST':
      return addWorkExperience(req, res)
    case 'PUT':
      return updateWorkExperience(req, res)
    case 'DELETE':
      return deleteWorkExperience(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getWorkExperience = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const workExperience = await prisma.workExperience.findMany({
      select: {
        title: true,
        company: true,
        location: true,
        startDate: true,
        endDate: true,
        description: true,
        id: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved work experience!",
      workExperience: JSON.stringify(workExperience),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addWorkExperience = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, company, location, startDate, endDate, description, userId } = req.body

  //must check if the logged user is the same as the userId

  const convertToISO8601 = (date: string) => {
    const [day, month, year] = date.split('.')
    return new Date(`${year}-${month}-${day}`).toISOString()
  }

  try {
    const existingWorkExperience = await prisma.workExperience.findFirst({
      where: {
        title,
        company,
        userId: parseInt(userId)
      }
    })

    if (existingWorkExperience) {
      return res.status(400).json({ error: 'Work experience already exists' })
    }

    const newWorkExperience = await prisma.workExperience.create({
      data: {
        title,
        company,
        location,
        startDate: convertToISO8601(startDate),
        endDate: convertToISO8601(endDate),
        description,
        userId: parseInt(userId)
      }
    })

    return res.status(201).json({
      success: "Successfully added work experience!",
      workExperience: JSON.stringify(newWorkExperience),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateWorkExperience = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, company, location, startDate, endDate, description, userId } = req.body

  const convertToISO8601 = (date: string) => {
    const [day, month, year] = date.split('.')
    return new Date(`${year}-${month}-${day}`).toISOString()
  }

  try {
    const workExperienceExists = await prisma.workExperience.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!workExperienceExists) {
      return res.status(404).json({
        error: "Work experience not found or you do not have permission to update it."
      })
    }

    const updateData = {
      title: title || workExperienceExists.title,
      company: company || workExperienceExists.company,
      location: location || workExperienceExists.location,
      startDate: startDate ? convertToISO8601(startDate) : workExperienceExists.startDate,
      endDate: endDate ? convertToISO8601(endDate) : workExperienceExists.endDate,
      description: description || workExperienceExists.description
    }

    const updatedWorkExperience = await prisma.workExperience.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated work experience!",
      workExperience: JSON.stringify(updatedWorkExperience),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteWorkExperience = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  try {
    const workExperienceExists = await prisma.workExperience.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!workExperienceExists) {
      return res.status(404).json({
        error: "Work experience not found or you do not have permission to delete it."
      })
    }

    const deletedWorkExperience = await prisma.workExperience.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted work experience!",
      workExperience: JSON.stringify(deletedWorkExperience),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}