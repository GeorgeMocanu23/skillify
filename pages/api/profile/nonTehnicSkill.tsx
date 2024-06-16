import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getNonTehnicSkill(req, res)
    case 'POST':
      return addNonTehnicSkill(req, res)
    case 'PUT':
      return updateNonTehnicSkill(req, res)
    case 'DELETE':
      return deleteNonTehnicSkill(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getNonTehnicSkill = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const nonTehnicSkill = await prisma.nonTehnicSkill.findMany({
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
      success: "Successfully retrieved non-tehnic skill!",
      nonTehnicSkill: JSON.stringify(nonTehnicSkill),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addNonTehnicSkill = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, level, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingNonTehnicSkill = await prisma.nonTehnicSkill.findFirst({
      where: {
        userId: parseInt(userId),
        name: name
      }
    })

    if (existingNonTehnicSkill) {
      return res.status(400).json({ error: 'Skill already exists' })
    }

    const newNonTehnicSkill = await prisma.nonTehnicSkill.create({
      data: {
        name: name,
        level: level,
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully added non-tehnic skill!",
      nonTehnicSkill: JSON.stringify(newNonTehnicSkill),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateNonTehnicSkill = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, level, userId } = req.body

  try {
    const existingNonTehnicSkill = await prisma.nonTehnicSkill.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingNonTehnicSkill) {
      return res.status(400).json({
        error:
          'Skill does not exist or you are not authorized to update it'
      })
    }

    const updateData = {
      name: name || existingNonTehnicSkill.name,
      level: level || existingNonTehnicSkill.level
    }

    const updatedNonTehnicSkill = await prisma.nonTehnicSkill.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated non-tehnic skill!",
      nonTehnicSkill: JSON.stringify(updatedNonTehnicSkill),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteNonTehnicSkill = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  try {
    const existingNonTehnicSkill = await prisma.nonTehnicSkill.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!existingNonTehnicSkill) {
      return res.status(400).json({
        error:
          'Skill does not exist or you are not authorized to delete it'
      })
    }

    await prisma.nonTehnicSkill.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted non-tehnic skill!",
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}