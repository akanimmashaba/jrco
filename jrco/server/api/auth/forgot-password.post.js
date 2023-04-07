import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();

export default async function(req, res) {
    const { email } = req.body;
  
    const user = await prisma.user.findUnique({
      where: { email }
    });
  
    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000);
  
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpiry
        }
      });
  
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD
        }
      });
  
      const mailOptions = {
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
          <p>Click <a href="http://localhost:3000/reset-password?token=${resetToken}">here</a> to reset your password. This link will expire in 1 hour.</p>
        `
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Password reset email sent' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };
  