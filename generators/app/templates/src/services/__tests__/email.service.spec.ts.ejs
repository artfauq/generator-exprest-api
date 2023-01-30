import Mail from 'nodemailer/lib/mailer';
import EmailService from '../email.service';

const sendMailMock = jest.fn();
const mailerMock = {
  sendMail: sendMailMock,
  verify: jest.fn(),
};

describe('Email service', () => {
  let emailService: EmailService;

  beforeAll(() => {
    emailService = new EmailService();
    emailService.mailer = mailerMock as unknown as Mail;
  });

  beforeEach(() => {
    sendMailMock.mockClear();
  });

  it('should send an email', async () => {
    await emailService.sendMail({});

    expect(sendMailMock).toHaveBeenCalled();
  });
});
