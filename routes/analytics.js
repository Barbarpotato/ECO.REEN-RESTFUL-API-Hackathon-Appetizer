const express = require('express');
const uniqid = require('uniqid');
const db = require('../dbconfig.js');

const router = express.Router();

router.route('')
    .get(async (req, res) => {
        const getEmissions = db.collection('emission');
        const snapshotEmission = await getEmissions.get();
        const getTrans = db.collection('prediction');
        const snapshotTrans = await getTrans.get();
        let data = [];
        let dateTime = []
        let totalEmissions = 0;
        let totalObject = 0;
        let fuelType = [];
        let activityObject = [];
        snapshotEmission.forEach(doc => {
            if (!dateTime.includes(doc.data().Date)) {
                dateTime.push(doc.data().Date);
            }
        });
        snapshotTrans.forEach(doc => {
            if (!dateTime.includes(doc.data().Date)) {
                fuelType.push(doc.data().type);
            }
            totalObject += parseInt(doc.data().total);
        })
        for (let i = 0; i < dateTime.length; i++) {
            const snapDate = await getEmissions.where('Date', '==', dateTime[i]).get();
            snapDate.forEach(doc => {
                totalEmissions += doc.data().CH4;
                totalEmissions += doc.data().CO2;
                totalEmissions += doc.data().N20;
                totalObject += doc.data().total;
            })
            if (fuelType && dateTime) {
                activityObject = ['Transportation', 'Machine'];
            }
            data.push({
                Date: dateTime[i], totalEmissions: totalEmissions, totalObject: totalObject,
                finance: totalEmissions * 30, activityObject: activityObject, fuelType: fuelType
            });
            totalEmissions = 0;
            totalObject = 0;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    })

module.exports = router;