import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getTehnicSkill(req, res)
    case 'POST':
      return addTehnicSkill(req, res)
    case 'PUT':
      return updateTehnicSkill(req, res)
    case 'DELETE':
      return deleteTehnicSkill(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getTehnicSkill = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const tehnicSkill = await prisma.tehnicSkill.findMany({
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
      success: "Successfully retrieved tehnic skill!",
      tehnicSkill: JSON.stringify(tehnicSkill),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addTehnicSkill = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, level, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingTehnicSkill = await prisma.tehnicSkill.findFirst({
      where: {
        userId: parseInt(userId),
        name: name
      }
    })

    if (existingTehnicSkill) {
      return res.status(400).json({ error: 'Tehnic skill already exists' })
    }

    const tehnicSkill = await prisma.tehnicSkill.create({
      data: {
        name,
        level,
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully added tehnic skill!",
      tehnicSkill: JSON.stringify(tehnicSkill),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateTehnicSkill = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, level, userId } = req.body

  try {
    const tehnicSkillExists = await prisma.tehnicSkill.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!tehnicSkillExists) {
      return res.status(404).json({
        error: "Tehnic skill not found or you do not have permission to update it."
      })
    }

    const updateData = {
      name: name || tehnicSkillExists.name,
      level: level || tehnicSkillExists.level
    }

    const tehnicSkill = await prisma.tehnicSkill.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated tehnic skill!",
      tehnicSkill: JSON.stringify(tehnicSkill),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteTehnicSkill = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  try {
    const tehnicSkill = await prisma.tehnicSkill.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!tehnicSkill) {
      return res.status(404).json({
        error: "Tehnic skill not found or you do not have permission to delete it."
      })
    }

    const deletedTehnicSkill = await prisma.tehnicSkill.delete({
      where: {
        id: tehnicSkill.id
      }
    })

    return res.status(200).json({
      success: "Successfully deleted tehnic skill!",
      tehnicSkill: JSON.stringify(deletedTehnicSkill),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}