import { NextResponse } from 'next/server';
import { prisma } from '@infinityenglish/utils/db';

export async function GET() {
  const userCount = await prisma.user.count();
  return NextResponse.json({ ok: true, userCount });
} 