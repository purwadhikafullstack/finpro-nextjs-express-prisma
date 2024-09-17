import { BACKEND_URL, RESEND_API, RESEND_FROM } from '@/config';

import { Resend } from 'resend';
import { User } from '@prisma/client';
import { VerificationEmail } from '@/emails/verification';
import { generateEmailToken } from '@/utils/encrypt.util';
import { render } from '@react-email/components';

export default class EmailAction {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(RESEND_API);
  }

  sendVerificationEmail = async (user: User) => {
    try {
      const { user_id, email } = user;

      const email_token = generateEmailToken({
        user_id,
        email,
      });

      const url = new URL(BACKEND_URL);
      url.pathname = '/api/v1/auth/verify';
      url.searchParams.set('token', email_token);

      const text = await render(VerificationEmail({ user, url: url.toString() }), {
        plainText: true,
      });

      await this.resend.emails.send({
        from: RESEND_FROM,
        to: [email],
        subject: 'Email Verification',
        react: VerificationEmail({ user, url: url.toString() }),
        text,
      });
    } catch (error) {
      throw error;
    }
  };
}
