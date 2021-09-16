const express = require('express');
const sonoff = require('./lib/sonoff');

const userRoute = require('./routes/user.route');
const deviceRoute = require('./routes/device.route');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/users', userRoute);
app.use('/api/v1/devices', deviceRoute);

module.exports = app;
