const nodemailer = require('nodemailer'); // Importa o nodemailer para enviar e-mails
const dotenv = require('dotenv'); // Importa o dotenv para carregar as variáveis de ambiente

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Cria um transportador de e-mail com as configurações de serviço e autenticação
const transporter = nodemailer.createTransport({
  service: 'gmail', // Serviço de e-mail usado (Gmail)
  auth: {
    user: process.env.EMAIL, // E-mail remetente
    pass: process.env.EMAIL_PASSWORD, // Senha do e-mail remetente
  },
});

// Função para enviar o e-mail de recuperação de senha
const sendResetEmail = async (to, token) => {
  const resetUrl = `https://yourfrontendurl/reset-password?token=${token}`; // URL para resetar a senha com o token

  const mailOptions = {
    from: process.env.EMAIL, // E-mail remetente
    to, // E-mail destinatário
    subject: 'Password Reset', // Assunto do e-mail
    html: `<p>You requested a password reset</p><p>Click this <a href="${resetUrl}">link</a> to reset your password</p>`, // Corpo do e-mail
  };

  await transporter.sendMail(mailOptions); // Envia o e-mail
};

module.exports = { sendResetEmail }; // Exporta a função de envio de e-mail
