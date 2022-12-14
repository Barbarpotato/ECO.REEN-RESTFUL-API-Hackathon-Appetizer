require('dotenv').config();
const express = require('express');
const transportation = require('./routes/transportation');
const machine = require('./routes/machine');
const analytics = require('./routes/analytics');
const comparison = require('./routes/comparison');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
    next();
});

app.use('/transportation', transportation);
app.use('/machine', machine);
app.use('/analytics', analytics);
app.use('/comparison', comparison);

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})