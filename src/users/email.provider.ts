import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: any;
  constructor() {
    // Create a Nodemailer transporter using SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
  }

  async sendMail(
    from: string,
    to: string,
    subject: string,
    text: string,
  ): Promise<void> {
    // Define email options
    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    // Send the email
    await this.transporter.sendMail(mailOptions);
  }
}
