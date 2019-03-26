const nodemailer = require('nodemailer');

 sendMail=(to,subject,message)=>
{
    const smtpConfig = {
        service: 'SMTP',
        auth: {
            user: 'example@domail.com',
            pass: '*********'
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    const mailOptions = {
        from: '"Hestagram" <example@domain.com>', // sender address
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
