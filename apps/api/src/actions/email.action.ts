import { BACKEND_URL } from '@/config';
import { User } from '@prisma/client';
import { generateEmailToken } from '@/utils/encryption';

export default class EmailAction {
  sendVerificationEmail = async (user: User) => {
    try {
      const email_token = generateEmailToken({
        user_id: user.user_id,
        email: user.email,
      });

      const url = new URL(BACKEND_URL);
      url.pathname = '/api/v1/auth/verify';
      url.searchParams.set('token', email_token);

      // TODO: send email
      console.log(url.toString());
    } catch (error) {
      throw error;
    }
  };
}
