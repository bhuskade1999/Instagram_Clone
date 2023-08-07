const nodeMailer = require("nodemailer")


exports.sendEmail = async (options) =>{

var transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b2065f9cf1353b",
      pass: "6e0b88654f80e8"
    }
  });

 
const mailOption ={
    from:"b2065f9cf1353b",
    to: options.email,
    subject: options.subject,
    text: options.message
}


await transporter.sendMail(mailOption)
}