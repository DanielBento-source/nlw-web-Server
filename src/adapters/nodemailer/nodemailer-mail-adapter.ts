import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ba24e3424e3888",
      pass: "9485783217d745"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe feedget <oi@feedget.com>',
            to:'Daniel Bento <dsbld2@gmail.com>',
            subject,    
            html: body,
        })
    }
}