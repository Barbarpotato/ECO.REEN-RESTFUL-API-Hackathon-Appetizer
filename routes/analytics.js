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
        let activityObject = [];
        let fuelType = [];
        let dateTime = [];
        let totalEmissions = 0;
        let totalObject = 0;
        let ch4 = 0;
        let co2 = 0;
        let n20 = 0;
        let co2eq = 0;
        snapshotEmission.forEach(doc => {
            if (!dateTime.includes(doc.data().Date)) {
                dateTime.push(doc.data().Date);
            }
        });
        snapshotTrans.forEach(doc => {
            totalEmissions += doc.data().diesel;
            totalEmissions += doc.data().ethanol;
            totalEmissions += doc.data().natural;
            totalEmissions += doc.data().premium;
            totalEmissions += doc.data().reguler;
            if (!dateTime.includes(doc.data().Date)) {
                fuelType.push(doc.data().type);
            }
            totalObject += parseInt(doc.data().total);
        })
        for (let i = 0; i < dateTime.length; i++) {
            const snapDate = await getEmissions.where('Date', '==', dateTime[i]).get();
            snapDate.forEach(doc => {
                ch4 += doc.data().CH4;
                co2 += doc.data().CO2;
                n20 += doc.data().N20;
                co2eq += doc.data().totalco2eq;
                totalObject += doc.data().total;
            })
            totalEmissions += ch4 + co2 + n20;
            if (fuelType && dateTime) {
                activityObject = ['Transportation', 'Machine'];
            }
            data.push({
                Date: dateTime[i], totalco2: co2, totalch4: ch4, totaln20: n20, totalco2eq: co2eq,
                totalEmissions: totalEmissions, totalObject: totalObject,
                finance: totalEmissions * 30, activityObject: activityObject, fuelType: fuelType,
                recover: parseInt(totalEmissions / 0.027)
            });
            totalEmissions = 0;
            totalObject = 0;
            ch4 = 0;
            co2 = 0;
            n20 = 0;
            co2eq = 0;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    })

module.exports = router;