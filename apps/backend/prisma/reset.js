const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetLogs() {
  try {
    await prisma.log.deleteMany();
    console.log('All logs have been reset.');
  } catch (error) {
    console.error('Error resetting logs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetLogs();
