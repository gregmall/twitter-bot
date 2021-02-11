const Tapquotes = require('../models/tapquotes');
const quoteData = require('./quotes');
const pool = require ('../utils/pool');
const fs = require('fs');

pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

Promise.all(

  quoteData.map(quote => {
    return Tapquotes.insert(quote);
  })
  
);
