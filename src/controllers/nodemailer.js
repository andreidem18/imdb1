const nodemailer = require('nodemailer');
const google = require('googleapis');

const CLIENT_ID = '1046680704315-qch8uoheirifsaqpi8aj3bi1c8v200sp.apps.googleusercontent.com';
const CLIENT_SECRET = 'Dg9WMDKKbvkUlsXuVAPkAmf4';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//041wQUbnEEOvhCgYIARAAGAQSNwF-L9IrWejTamEd0dih1tGfE_kVCDMzC8_jYc724VDEL77eZKyV4cl6ZgHg3K-bQ9WOFTqHML4';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sendMain = async(email) => {
    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'imdbcopy@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'imdbcopy@gmail.com',
            to: email,
            subject: 'Verification',
            text: 'Verification',
            html: '<h1> Verification <h1>'
        }

        const result = await transport.sendEmail(mailOptions);
        return result;
    } catch(error){
        return error;
    }
}