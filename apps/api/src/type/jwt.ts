import { User } from '@prisma/client';

export type AccessTokenPayload = Pick<User, 'user_id' | 'fullname' | 'email' | 'avatar_url' | 'role' | 'is_verified'>;

export type RefreshTokenPayload = Pick<User, 'user_id' | 'email'>;

export type EmailTokenPayload = Pick<User, 'user_id' | 'email'>;
