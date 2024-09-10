import { NextResponse } from 'next/server';
import { User } from '@/types/user';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { token, allowed } = await request.json();

  const payload = jwt.verify(token, process.env.NEXT_PRIVATE_JWT_SECRET as string) as User;
  if (!payload) return NextResponse.json({ protected: true });

  if (allowed.includes(payload.role)) return NextResponse.json({ protected: false });
  return NextResponse.json({ protected: true });
}
