import { transporter } from "./email.config.js";
import { VerificationEmailTemplate } from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Ecommerce Category App" <devflex.studio@gmail.com>',
      to: email,
      subject: "Verify your Email",
      text: "Verify you email to log into ecommerce app",
      html: VerificationEmailTemplate.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    console.log("Email send Successfully", response);

  } catch (error) {
    console.log("Email error", error);
  }
  
};
