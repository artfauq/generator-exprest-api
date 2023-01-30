import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Container } from 'typedi';
import { Config } from '../config';

/**
 * Mail transport initializer
 */
export default async function initMailer(): Promise<Mail> {
  const config = Container.get<Config>('config');

  try {
    const options: SMTPTransport.Options = {
      host: config.smtp.host,
      port: config.smtp.port,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password,
      },
    };

    // Initialize SMTP transport
    const smtpTransport = createTransport(options);

    // Test SMTP connection
    await smtpTransport.verify();

    return smtpTransport;
  } catch (err) {
    throw new Error(`failed to connect to SMTP server. ${err}`);
  }
}
