import { join } from 'path';
import fs from 'fs/promises';
import Handlebars from 'handlebars';
import { transporter } from '@/libs/nodemailer';
import { HttpException } from '@/exceptions/http.exception';
import { generateToken } from '@/utils/tokenUtil';

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  context: object,
) => {
  try {
    const templatePath = join(__dirname, '../templates', `${templateName}.hbs`);
    const templateSource = await fs.readFile(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(templateSource);
    const html = compiledTemplate(context);

    await transporter.sendMail({
      to,
      subject,
      html,
    });
  } catch (error) {
    throw new HttpException(
      500,
      `Error sending email: ${(error as Error).message}`,
    );
  }
};

// Untuk kirim email verifikasi ngubah isVerified jadi TRUE
export const sendVerificationEmail = async (user: any) => {
  try {
    const token = generateToken(
      { user_id: user.user_id, email: user.email },
      '30m',
      String(process.env.JWT_SECRET),
    );

    const verificationLink = `${process.env.BE_BASE_URL}/auth/verify?token=${token}`;

    //jangan lupa apus
    console.log(verificationLink);

    await sendEmail(
      user.email,
      'Complete Your Account Setup - Verify Your Email and Set Your Password',
      'emailVerification',
      {
        name: user.first_name,
        url: verificationLink,
      },
    );
  } catch (error) {
    throw new Error(
      `Error sending verification email: ${(error as Error).message}`,
    );
  }
};
