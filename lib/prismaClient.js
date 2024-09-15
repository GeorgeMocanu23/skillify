import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import ws from 'ws';

dotenv.config();
neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

let prisma;

try {
  prisma = new PrismaClient({ adapter });
  console.log('Prisma Client successfully created');
} catch (error) {
  console.error('Error creating Prisma Client:', error);
  process.exit(1);
}

export default prisma;
