// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="node" />

import { PrismaClient, ExamTypeEnum } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Exam Types
  const examTypes = [
    { name: ExamTypeEnum.OET },
    { name: ExamTypeEnum.IELTS },
  ];

  for (const examType of examTypes) {
    await prisma.examType.upsert({
      where: { name: examType.name },
      update: {},
      create: examType,
    });
  }

  console.log('Seeded exam types:', examTypes.map(e => e.name));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 