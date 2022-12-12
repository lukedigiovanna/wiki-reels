import admin from 'firebase-admin';

const config = require('../../firebase-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(config)
});

