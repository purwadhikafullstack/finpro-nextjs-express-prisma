import { AccessTokenPayload, EmailTokenPayload, RefreshTokenPayload } from '@/type/jwt';
import { compare, genSalt, hash } from 'bcrypt';

import { JWT_SECRET } from '@/config';
import jwt from 'jsonwebtoken';

export async function generateHash(password: string) {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  return hashed;
}

export async function comparePasswords(password: string, hash: string) {
  const valid = await compare(password, hash);
  return valid;
}

export function generateAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });
}

export function generateRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export function generateEmailToken(payload: EmailTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30m',
  });
}
