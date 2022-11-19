require('dotenv').config();
// Import the functions you need from the SDKs you need
const firebase = require('firebase-admin');

firebase.initializeApp({
    credential: firebase.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECTID,
        private_key_id: process.env.PRIVATEKEYID,
        private_key: process.env.PRIVATEKEY.replace(/\\n/gm, "\n"),
        client_email: process.env.CLIENTEMAIL,
        client_id: process.env.CLIENTID,
        auth_uri: process.env.AUTHURI,
        token_uri: process.env.TOKENURI,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.client_x509_cert_url
    })
})
console.log(process.env.PRIVATEKEY.replace(/\\n/gm, "\n"));

const db = firebase.firestore();
module.exports = db;
