import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "devflex.studio@gmail.com",
    pass: "ucjq hxvd ngac hwuv",
  },
});
