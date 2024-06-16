import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getSocialMedia(req, res)
    case 'POST':
      return addSocialMedia(req, res)
    case 'PUT':
      return updateSocialMedia(req, res)
    case 'DELETE':
      return deleteSocialMedia(req, res)
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

const getSocialMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body
  const session = await getSession({ req })

  //must check if the logged user is the same as the userId

  /*if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }*/

  try {
    const socialMedia = await prisma.socialMedia.findMany({
      select: {
        name: true,
        link: true,
        id: true
      },
      where: {
        userId: parseInt(userId)
      }
    })

    return res.status(200).json({
      success: "Successfully retrieved social media!",
      socialMedia: JSON.stringify(socialMedia),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const addSocialMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, link, userId } = req.body

  //must check if the logged user is the same as the userId

  try {
    const existingSocialMedia = await prisma.socialMedia.findFirst({
      where: {
        name,
        userId: parseInt(userId)
      }
    })

    if (existingSocialMedia) {
      return res.status(400).json({ error: 'Social media already exists' })
    }

    const newSocialMedia = await prisma.socialMedia.create({
      data: {
        name,
        link,
        userId: parseInt(userId)
      }
    })

    return res.status(201).json({
      success: "Successfully added social media!",
      socialMedia: JSON.stringify(newSocialMedia),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const updateSocialMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, link, id, userId } = req.body

  try {
    const socialMediaExists = await prisma.socialMedia.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!socialMediaExists) {
      return res.status(404).json({
        error: "Social media not found or you do not have permission to update it."
      })
    }

    const updateData = {
      name: name || socialMediaExists.name,
      link: link || socialMediaExists.link,
    }

    const updatedSocialMedia = await prisma.socialMedia.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    return res.status(200).json({
      success: "Successfully updated social media!",
      socialMedia: JSON.stringify(updatedSocialMedia),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteSocialMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.body

  try {
    const socialMediaExists = await prisma.socialMedia.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(userId)
      }
    })

    if (!socialMediaExists) {
      return res.status(404).json({
        error: "Social media not found or you do not have permission to delete it."
      })
    }

    const deletedSocialMedia = await prisma.socialMedia.delete({
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json({
      success: "Successfully deleted social media!",
      socialMedia: JSON.stringify(deletedSocialMedia),
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}