const express = require('express');
const app = express();
const Route1 = require('./Router/Route');
const port =4000;
const bodyParser = require('body-parser');
const session = require('express-session');


const ip="http://ankit-intern.hestalabs.com";
// const ip='http://localhost:3006'
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ip);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(session({ secret: 'keyboard cat',
    resave:false, saveUninitialized:true,
    cookie: { maxAge: 60000 }}
    )
);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',Route1);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/upload', express.static(__dirname + '/public'));



app.listen(port, ()=>{
   console.log(`server started at port ${port}`);
});