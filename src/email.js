const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (data) => {
  console.log(data);
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ACCOUNT,
      to: process.env.EMAIL_DISTRIBUTION,
      subject: "New Visitor",
      html: `Name: ${data.lastName}, ${data.firstName}
      <br>Sign-in: ${data.signinTime}</br>
      <br>phone number: ${data.phoneNumber}</br>
      <br>symptoms: ${data.sympotms}</br>
      `,
    });
  } catch (err) {
    console.error(err);
  }
};
module.exports = { sendEmail };
