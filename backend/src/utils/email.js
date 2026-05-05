import nodemailer from 'nodemailer';
import { welcomeEmailTemplate } from './welcomeEmail.js';

export const sendEmail = async (to, subject, fullName) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `'code-kro'<mohitkumarudn802210@gmail.com>`,
    to,
    subject,
    html: welcomeEmailTemplate(fullName),
  });
};
