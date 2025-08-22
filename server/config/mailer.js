const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP avec Mailtrap
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ff81410b5f4eec",  // Remplace par ton utilisateur Mailtrap
    pass: "f31a53970d78cf"   // Remplace par ton mot de passe Mailtrap
  }
});

async function sendEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: 'noreply@votreplateforme.com',
      to: to,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès (simulé via Mailtrap)');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
}

module.exports = { sendEmail };
