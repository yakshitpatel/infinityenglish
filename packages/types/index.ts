// Re-export all Prisma types
export * from '@prisma/client';

// User roles enum
export const UserRole = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN', 
  TUTOR: 'TUTOR',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// Exam types enum
export const ExamType = {
  OET: 'OET',
  IELTS: 'IELTS',
} as const;

export type ExamType = typeof ExamType[keyof typeof ExamType]; 