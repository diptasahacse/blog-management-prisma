import nodemailer from "nodemailer";
import config from "../config";
import { ISendEmailPayload } from "../types/email";
const transporter = nodemailer.createTransport({
  host: config.mail_smtp_host,
  port: config.mail_port as unknown as number,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: config.mail_app_user,
    pass: config.mail_app_password,
  },
});

const sendEmail = async (data: ISendEmailPayload) => {
  try {
    await transporter.sendMail({
      from: `"${config.app_name}"`,
      to: data.to,
      subject: data.subject,
      html: data.html, // HTML version of the message
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to send verification email", error);
  }
};

export default sendEmail;
