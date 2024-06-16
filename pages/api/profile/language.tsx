import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getLanguage(req, res)
    case 'POST':
      return addLanguage(req, res)
    case 'PUT':
      return updateLanguage(req, res)
    case 'DELETE':
      return deleteLanguage(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const language = await prisma.language.findMany({
      select: {
        name: true,
        level: true,
        id: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved language!",
      language: JSON.stringify(language),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, level, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingLanguage = await prisma.language.findFirst({
      where: {
        userId: parseInt(userId),
        name: name
      }
    })

    if (existingLanguage) {
      return res.status(400).json({ error: 'Language already exists' })
    }

    const language = await prisma.language.create({
      data: {
        name,
        level,
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully added language!",
      language: JSON.stringify(language),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, level, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingLanguage = await prisma.language.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingLanguage) {
      return res.status(404).json({
        error: 'Language not found or you do not have permission to update it.'
      })
    }

    const updateData = {
      name: name || existingLanguage.name,
      level: level || existingLanguage.level
    }

    const updatedLanguage = await prisma.language.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated language!",
      language: JSON.stringify(updatedLanguage),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteLanguage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingLanguage = await prisma.language.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingLanguage) {
      return res.status(404).json({
        error: 'Language not found or you do not have permission to delete it.'
      })
    }

    await prisma.language.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted language!"
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}