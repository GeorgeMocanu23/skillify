import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  try {
    const users = await prisma.users.findMany();
    console.log(users);

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: 'Could not fetch users' });
  }
}