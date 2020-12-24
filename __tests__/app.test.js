const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Tapquotes = require('../lib/models/tapquotes');

describe('twitter-bot routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });
  it('inserts a quote into the database', async() =>{
    const createdQuote = await Tapquotes.insert({
      quote: 'this is a quote',
      character: 'Steve Quoteski',
      hashtags: ['#kickass', '#stuff']
    });
    const { rows } = await pool.query(
      'SELECT * FROM tapquotes WHERE id = $1', [createdQuote.id]
    );
    expect(rows[0]).toEqual(createdQuote);
  });
  it('finds a quote by id', async() => {
    const createdQuote = await Tapquotes.insert({
      quote: 'this is a quote',
      character: 'Steve Quoteski',
      hashtags: ['#kickass', '#stuff']
    });
    const foundQuote = await Tapquotes.findById(createdQuote.id);
    expect(foundQuote).toEqual({
      id: foundQuote.id,
      quote: 'this is a quote',
      character: 'Steve Quoteski',
      hashtags: ['#kickass', '#stuff']

    })

    
  });
});
