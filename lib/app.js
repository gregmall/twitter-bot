const express = require('express');
const app = express();
require('./Twitter/twit')
app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
