const nodemailer = require('nodemailer');

 sendMail=(to,subject,message)=>
{
    const smtpConfig = {
        service: 'Gmail',
        auth: {
            user: 'ankitdubeymail@gmail.com',
            pass: 'a@n@k@t@123'
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    const mailOptions = {
        from: '"Hestagram" <ankitdubeymail1@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: 'Verification mail from Hestagram', // plaintext body
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
