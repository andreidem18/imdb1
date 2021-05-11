const nodemailer = require('nodemailer');
const {google} = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sendEmail = (email, hash) => {

        const accessToken = oAuth2Client.getAccessToken();

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

        const mailOptions = {
            from: 'imdbcopy@gmail.com',
            to: email,
            subject: 'Verification',
            generateTextFromHTML: true,
            html: `<a href="http://localhost:8000/verify/${hash}"> Verification <a>`
        }

        transport.sendMail(mailOptions, (error, response) => {
            if(error){
                console.log(error);
            } else {
                console.log(response);
            }
        });
}

module.exports = sendEmail;