export type User = {
  user_id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  avatarFilename?: string;
  isVerified: boolean;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
