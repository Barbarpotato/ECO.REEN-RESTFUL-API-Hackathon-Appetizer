const express = require('express');
const tf = require('@tensorflow/tfjs');
const db = require('../dbconfig.js');
const uniqid = require('uniqid');

const router = express.Router();

router.route('')
    .get(async (req, res) => {
        const getFile = db.collection('prediction');
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
        // encoded features = ['reguler', 'premium', 'ethanol', 'diesel', 'natural'];
        // features = ['Engine Size(L)', 'Cylinders', 'Fuel Consumption City (L/100 km)', 'Fuel Consumption Hwy (L/100 km)'];
        const engineSize = await parseInt(req.body.enginesize);
        const cylinders = await parseInt(req.body.cylinders);
        const fuelcon = await parseInt(req.body.fuelconsumptioncity);
        const fuelconhwy = await parseInt(req.body.fuelconsumptionhwy);

        const inputReg = tf.tensor2d([[engineSize, cylinders, fuelcon, fuelconhwy, 0, 0, 0, 0, 1]]);
        const inputPrem = tf.tensor2d([[engineSize, cylinders, fuelcon, fuelconhwy, 0, 0, 0, 1, 0]]);
        const inputEth = tf.tensor2d([[engineSize, cylinders, fuelcon, fuelconhwy, 0, 0, 1, 0, 0]]);
        const inputDies = tf.tensor2d([[engineSize, cylinders, fuelcon, fuelconhwy, 0, 1, 0, 0, 0]]);
        const inputNat = tf.tensor2d([[engineSize, cylinders, fuelcon, fuelconhwy, 1, 0, 0, 0, 0]]);

        const model = await tf.loadLayersModel('https://raw.githubusercontent.com/lixx21/Transportation_Emission_Prediction/main/models/tfjs_model/model.json');

        const result1 = model.predict(inputReg);
        const result2 = model.predict(inputPrem);
        const result3 = model.predict(inputEth);
        const result4 = model.predict(inputDies);
        const result5 = model.predict(inputNat);

        const predictedValue1 = result1.arraySync()[0][0];
        const predictedValue2 = result2.arraySync()[0][0];
        const predictedValue3 = result3.arraySync()[0][0];
        const predictedValue4 = result4.arraySync()[0][0];
        const predictedValue5 = result5.arraySync()[0][0];

        await db.collection('prediction').doc(uniqid()).set({
            'reguler': predictedValue1, 'premium': predictedValue2, 'ethanol': predictedValue3,
            'diesel': predictedValue4, 'natural': predictedValue5,
            'type': req.body.type, 'total': req.body.total
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ "status": 'Success inpute data!' });
    })

module.exports = router;

