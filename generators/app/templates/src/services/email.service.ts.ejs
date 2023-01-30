import Mail from 'nodemailer/lib/mailer';
import { Inject, Service } from 'typedi';

@Service()
export default class EmailService {
  @Inject('mailer')
  mailer!: Mail;

  /**
   * Sends an email with configured options.
   *
   * @param options Mail options
   */
  async sendMail(options: Mail.Options): Promise<void> {
    try {
      await this.mailer.sendMail(options);
    } catch (error) {
      throw new Error(
        `failed to send mail: ${JSON.stringify(error)}. Options: ${JSON.stringify(options)}`,
      );
    }
  }
}
