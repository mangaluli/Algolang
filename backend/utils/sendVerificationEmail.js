const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAILBOT_EMAIL,
    pass: process.env.EMAILBOT_PASSWORD,
  },
});

exports.sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:${process.env.PORT}/verify-email?token=${token}`;
  const mailOptions = {
    from: '"AlgoLang" <noreply@algolang.net>',
    to: email,
    subject: "Please verify your email address",
    text: `Hello,

    Thank you for registering with AlgoLang. To complete your registration, please verify your email address by clicking the following link:

    Click here to verify!

    If you didn't request this verification, please ignore this email.

    Best regards,
    AlgoLang Team`,
    html: `
      <p>Hello,</p>
      <p>Thank you for registering with AlgoLang. To complete your registration, please verify your email address by clicking the following link:</p>
      <p><a href="${verificationLink}" target="_blank">Click here to verify!</a></p>
      <p>If you didn't request this verification, please ignore this email.</p>
      <p>Best regards,</p>
      <p>AlgoLang Team</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Verification email sent: %s", info.messageId);
};
