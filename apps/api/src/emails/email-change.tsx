import * as React from 'react';

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { User } from '@prisma/client';

interface EmailChangeEmailProps {
  user: User;
  url: string;
}

export const EmailChangeEmail = ({ user, url }: EmailChangeEmailProps) => {
  const logo = process.env.BACKEND_URL + '/static/logo.png';

  return (
    <Html lang='en'>
      <Head />
      <Tailwind>
        <Body className='px-6 mx-auto my-auto mt-10 font-sans bg-zinc-50/50'>
          <Container className='border border-solid border-[#e5e7eb] rounded-xl p-8 bg-white'>
            <Section className='flex flex-col space-y-6'>
              <Img src={logo} width='32' height='32' alt='LaundryXpress Logo' />
              <Heading className='text-2xl font-bold'>Welcome to {process.env.PROJECT_NAME}</Heading>

              <Text className='text-zinc-500'>
                Hello {user.fullname}, you are receiving this email because you changed your email address on
                LaundryXpress, here are the details of your account.
              </Text>

              <Section className='border border-solid border-[#e5e7eb] rounded-xl text-zinc-500 text-sm'>
                <Row className='border-b border-solid border-[#e5e7eb] p-4'>
                  <Column className='text-zinc-900'>Full Name : </Column>
                  <Column align='right'>{user.fullname}</Column>
                </Row>
                <Row className='border-b border-solid border-[#e5e7eb] p-4'>
                  <Column className='text-zinc-900'>Email : </Column>
                  <Column align='right'>{user.email}</Column>
                </Row>
                <Row className='p-4'>
                  <Column className='text-zinc-900'>Phone : </Column>
                  <Column align='right'>{user.phone}</Column>
                </Row>
              </Section>

              <Text className='text-zinc-500'>Please click the button below to verify your email address.</Text>

              <Section className='flex justify-start mt-8'>
                <Link href={url} className='font-medium text-center px-6 py-3 rounded-lg bg-[#2563eb] text-white block'>
                  Verify Email
                </Link>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailChangeEmail.PreviewProps = {
  user: {
    fullname: 'Alan Turing',
    phone: '+1 (555) 555-5555',
    email: 'alan.turing@example.com',
    avatar_url: 'https://avatars.githubusercontent.com/u/275474?v=4',
  },
  url: 'https://laundry.express/auth/verify?token=abc',
} as EmailChangeEmailProps;

export default EmailChangeEmail;
