const nodemailer = require("nodemailer")

export const sendMail = async (recipient:string, subject:string, message:string) => {
    
    const port = process.env.MAIL_PORT as string;

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: port,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    const mailOptions ={
        from:process.env.MAIL_SENDER,
        to:recipient,
        subject:subject,
        text:message
    }

    transporter.sendMail(mailOptions, function(error:Error|null, info:any){
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

}