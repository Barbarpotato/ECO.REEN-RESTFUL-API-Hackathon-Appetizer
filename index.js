require('dotenv').config();
const express = require('express');
const transportation = require('./routes/transportation');
const analytics = require('./routes/analytics');

const app = express();
app.use(express.json());

app.use('/transportation', transportation);
app.use('/analytics', analytics);

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})