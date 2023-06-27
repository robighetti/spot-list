const nodemailer = require('nodemailer')

class MailProvider {
  /**
   * Faz a conexão com o servidor de email
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      debug: true,
      logger: true,
      auth: {
        user: 'a1a121de64b1ad',
        pass: 'de447327e8c1de',
      },
    })
    /* this.tranporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      debug: true,
      logger: true,
      secureConnection: false,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: '7466b567d37108',
        pass: '********8b5e',
      },
    }) */
  }

  async sendMail(email, subject, template) {
    await this.transporter.sendMail({
      from: 'Equipe SpotList <robighetti@gmail.com>',
      to: email,
      subject,
      html: template,
    })
  }
}

module.exports = MailProvider
