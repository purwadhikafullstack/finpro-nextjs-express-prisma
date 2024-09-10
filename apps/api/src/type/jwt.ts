import { User } from '@prisma/client';

export type AccessTokenPayload = Pick<User, 'user_id' | 'fullname' | 'email' | 'avatar_url' | 'role'>;

export type RefreshTokenPayload = Pick<User, 'user_id' | 'email'>;

export type EmailTokenPayload = Pick<User, 'user_id' | 'email'>;
