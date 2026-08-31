import nodemailer from "nodemailer";

const sendEmail = async (to, subject, message) => {
  try {
    console.log("Started sending email");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSCODE,
      },
    });

    console.log("Verifying email transporter...");

    await transporter.verify();

    console.log("Transporter verified successfully");

    const mailOption = {
      from: `"CraveIt" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: message,
    };

    console.log("Sending email to:", to);

    const response = await transporter.sendMail(mailOption);

    console.log("Email sent successfully");
    console.log("Message ID:", response.messageId);

    return response;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

export default sendEmail;