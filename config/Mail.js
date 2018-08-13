const nodemailer = require('nodemailer');

 sendMail=(to,subject,message)=>
{
    const smtpConfig = {
        service: 'SMTP',
        auth: {
            user: 'ankitdubeymail1@gmail.con',
            pass: 'mail@#555'
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    const mailOptions = {
        from: '"Hestagram" <ankitdubeymail1@gmail.con>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: 'Account verification mail from Hestagram', // plaintext body
        html: message // html body
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error)
        {
            return console.log(error);
        }
        else
        {
            return console.log(info.response);
        }
    });
}
