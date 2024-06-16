import type { NextApiRequest, NextApiResponse } from 'next'
//import { getSession } from 'next-auth/react'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getEducation(req, res)
    case 'POST':
      return addEducation(req, res)
    case 'PUT':
      return updateEducation(req, res)
    case 'DELETE':
      return deleteEducation(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getEducation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body
  //const session = await getSession({ req })

  //must check if the logged user is the same as the userId

  /*
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  */

  try {
    const education = await prisma.education.findMany({
      select: {
        school: true,
        degree: true,
        field: true,
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
      success: "Successfully retrieved education!",
      education: JSON.stringify(education),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addEducation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { school, degree, field, startDate, endDate, description, userId } = req.body

  //must check if the logged user is the same as the userId

  const convertToISO8601 = (date: string) => {
    const [day, month, year] = date.split('.')
    return new Date(`${year}-${month}-${day}`).toISOString()
  }

  try {
    const existingEducation = await prisma.education.findFirst({
      where: {
        userId: parseInt(userId),
        school,
        degree,
        field,
      }
    })

    if (existingEducation) {
      return res.status(400).json({ error: 'Education already exists' })
    }

    const newEducation = await prisma.education.create({
      data: {
        school,
        degree,
        field,
        startDate: convertToISO8601(startDate),
        endDate: convertToISO8601(endDate),
        description,
        userId: parseInt(userId),
      }
    })

    return res.status(201).json({
      success: "Successfully added education!",
      education: JSON.stringify(newEducation),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateEducation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, school, degree, field, startDate, endDate, description, userId } = req.body

  const convertToISO8601 = (date: string) => {
    const [day, month, year] = date.split('.')
    return new Date(`${year}-${month}-${day}`).toISOString()
  }

  try {
    const existingEducation = await prisma.education.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingEducation) {
      return res.status(404).json({
        error: 'Education not found or you do not have permission to update it.'
      })
    }

    const updatedData = {
      school: school || existingEducation.school,
      degree: degree || existingEducation.degree,
      field: field || existingEducation.field,
      startDate: startDate ? convertToISO8601(startDate) : existingEducation.startDate,
      endDate: endDate ? convertToISO8601(endDate) : existingEducation.endDate,
      description: description || existingEducation.description,
    }

    const updatedEducation = await prisma.education.update({
      where: {
        id: parseInt(id)
      },
      data: updatedData
    })

    return res.status(200).json({
      success: "Successfully updated education!",
      education: JSON.stringify(updatedEducation),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteEducation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  try {
    const existingEducation = await prisma.education.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingEducation) {
      return res.status(404).json({
        error: 'Education not found or you do not have permission to delete it.'
      })
    }

    const deletedEducation = await prisma.education.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted education!",
      education: JSON.stringify(deletedEducation),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}