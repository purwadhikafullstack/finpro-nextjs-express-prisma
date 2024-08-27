import { join } from 'path';
import fs from 'fs/promises';
import Handlebars from 'handlebars';
import { transporter } from '@/libs/nodemailer';
import { HttpException } from '@/exceptions/http.exception';

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
