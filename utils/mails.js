const nodemailer = require('nodemailer')

const sendMail = async({subject,email_to,body_message}) =>{
    
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSKEY,
    },
    tls:{
        rejectUnauthorized:false
        
    }
  });
const options = {
  from:process.env.EMAIL,
      to:email_to,
      reply_to:process.env.EMAIL,
          subject:subject,
    html:body_message

}
  transporter.sendMail(options,(err, info) =>{
    if (err) {
        console.log(err);
    } else {
        console.log(info);
    }

  })
}

module.exports = sendMail