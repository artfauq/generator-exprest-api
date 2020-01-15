/**
 * @typedef {import('nodemailer').Transporter} Transporter
 */

const { createTransport } = require('nodemailer');

const { SMTP, proxy } = require('./index');

// Initialize SMTP transport
const transporter = createTransport({
  host: SMTP.host,
  port: SMTP.port,
  auth: {
    user: SMTP.user,
    pass: SMTP.pass,
  },
  proxy,
});

module.exports = transporter;
