import { PrismaClient } from '@prisma/client';

const isProduction = process.env.NODE_ENV === 'production';

let prisma: PrismaClient;

if (isProduction) {
  const { default: prodPrisma } = require('./prismaClient');
  prisma = prodPrisma;
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;