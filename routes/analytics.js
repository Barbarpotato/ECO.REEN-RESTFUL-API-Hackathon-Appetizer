const express = require('express');
const uniqid = require('uniqid');
const db = require('../dbconfig.js');
const emission = require('../dbconfig.js');

const router = express.Router();

router.route('')
    .get(async (req, res) => {
        const getFile = emission.collection('emission');
        const snapshot = await getFile.get();
        const data = []
        snapshot.forEach(doc => {
            data.push(doc.data());
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    })
    .post(async (req, res) => {
        const data = req.body;
        await db.collection('emission').doc(uniqid()).set(data);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ "status": 'Success inpute data!' });
    })

module.exports = router;