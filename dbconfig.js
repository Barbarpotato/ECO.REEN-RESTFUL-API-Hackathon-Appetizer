require('dotenv').config();
// Import the functions you need from the SDKs you need
const firebase = require('firebase-admin');

firebase.initializeApp({
    credential: firebase.credential.cert({
        project_id: process.env.PROJECTID,
        private_key_id: process.env.PRIVATEKEYID,
        private_key: process.env.PRIVATEKEY
            ? process.env.PRIVATEKEY.replace(/\\n/g, '\n')
            : undefined,
        client_email: process.env.CLIENTEMAIL,
    })
})

const db = firebase.firestore();
module.exports = db;
