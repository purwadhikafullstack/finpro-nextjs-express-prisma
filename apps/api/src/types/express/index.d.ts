export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  profilePicture?: string;
  isVerified: boolean;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
