export type User = {
  user_id: string;
  email: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
