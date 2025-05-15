import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'
import { PrismaClient } from '@prisma/client'
 
const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL)
  throw new Error(
    'DATABASE_URL is not defined. Please set it in your environment variables.'
  )
 
// Initialize Prisma Client
const adapter = new PrismaTiDBCloud({ url: DATABASE_URL })
const prisma = new PrismaClient({ adapter })
 
export { prisma }
