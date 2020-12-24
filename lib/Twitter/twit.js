/* eslint-disable max-len */
const Twit = require('twit');
const fs = require('fs');
const Tapquotes = require('../models/tapquotes');
const b64content = fs.readFileSync('./assets/votebuttonstweetpiuc.jpg', { encoding: 'base64' });

module.exports = function twitBot(){

  const T = new Twit({
    consumer_key:  process.env.APPLICATION_CONSUMER_KEY,
    consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });

  const myBot = process.env.BOT_ID;
  
  const dataStream = T.stream('statuses/filter', { follow: [myBot] });

  dataStream.on('tweet', async(tweet)=> {
    if(tweet.in_reply_to_user_id_str === myBot && tweet.user.id_str != myBot){
      const params = { status: `@${tweet.user.screen_name}\n `, in_reply_to_status_id: tweet.id_str };
      const randomNumber = Math.ceil(Math.random() * 20);

      

    }
  
  });



};
