const mailer = require('express-mailer');
const express =require('express');
const app = express();

mailer.extend(app, {
    from: 'ankitdubeymail1@gmail.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'ankitdubeymail1@gmail.com',
        pass: 'mail@#$555'
    }
});

