import nodemailer from "nodemailer";

const sendEmail = async (to,subject,message) => {
  try {
    console.log("Started sending email");


    //transporting to sender gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSCODE,
      },
    });

    console.log("3....2....1....!");

    //sending email using sender to reciever

    const mailOption = {
      from: process.env.GMAIL_USER, //sender
      to, //recever or user
      subject,
      html: message,
    };

    console.log("Sending email");

    const res = await transporter.sendMail(mailOption);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
