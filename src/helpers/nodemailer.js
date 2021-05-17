const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


const emailOptions = {
    from: 'imdbcopy@gmail.com',
    to: 'andres.david.mm@hotmail.com',
    subject: 'Verification'
}

const sendEmail = (options) => {

        const accessToken = oAuth2Client.getAccessToken();

        const handlebarsOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve('./src/views'),
                defaultLayout: false
            },
            viewPath: path.resolve('./src/views')
        }

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'imdbcopy@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        transport.use('compile', hbs(handlebarsOptions));

        transport.sendMail(options, (error, response) => {
            if(error){
                console.log(error);
            } else {
                console.log(response);
            }
        });
}

module.exports = {sendEmail, emailOptions};