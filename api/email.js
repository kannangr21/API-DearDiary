const nodeMailer = require('nodemailer');
require('dotenv').config()
var devMails = process.env.DEV_MAILS;
const transporter = nodeMailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth : {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    secure: true,
});

const mailData = (recMail, otp) => {
    return {
        from: process.env.EMAIL,
        to: recMail,
        subject : 'OTP to change your password.',
        text : 'Hello,\n\tKindly use the OTP ' + otp + ' to change your password.',
    }
}

const sendEMail = (recMail, otp) => {
    transporter.sendMail(mailData(recMail, otp), (err, info) => {
        if(err){
            console.log("Error : ", err);
        }
        // else is not defined to avoid logs  
    });
    return true;
}

const feedMail = (name, feedback) => {
    return {
        from: process.env.EMAIL,
        to: devMails,
        subject : 'Feedback received',
        text :  `Name : ${name}\nFeedback written : ${feedback}`,
    }
}

const sendFeedback = (name, feedback) => {
    transporter.sendMail(feedMail(name, feedback), (err, info) => {
        if(err){
            console.log("Error : ", err);
        }
    });
    return true;
} 

module.exports = { sendEMail, sendFeedback};
