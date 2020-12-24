const pool = require('../utils/pool');

module.exports = class Tapquotes{
  id;
  quote;
  character;
  hashtags;

  constructor(row){
    this.id = row.id;
    this.quote = row.quote;
    this.character = row.character;
    this.hashtags = row.hashtags;
    
  }

  static async insert(tapquotes) {
    const { rows } = await pool.query(
      `INSERT INTO tapquotes (quote, character,hashtags) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [tapquotes.quote, tapquotes.character, tapquotes.hashtags]
    );
    return new Tapquotes(rows[0]);
  }

  static async findById(id){
    const { rows } = await pool.query(
      'SELECT * FROM tapquotes WHERE id = $1',
      [id]
    );
    if(!rows[0]) return null;
    else return new Tapquotes(rows[0]);
  }


};
