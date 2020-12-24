const Twit = require('twit');
const fs = require('fs');

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
    if(tweet.in_reply_to_user_id_str === myBot && tweet.user.id_str != myBot ){
      

    }
  
  });



};
