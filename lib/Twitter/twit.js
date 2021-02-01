/* eslint-disable max-len */
const Twit = require('twit');
const fs = require('fs');
const Tapquotes = require('../models/tapquotes');
const b64content = fs.readFileSync('./assets/tap.jpg', { encoding: 'base64' });

module.exports = function twitBot(){

  const T = new Twit({
    consumer_key:  process.env.APPLICATION_CONSUMER_KEY,
    consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });

  const myBot = process.env.BOT_ID;
  const targetUser = process.env.TWITTER_FOLLOW_USER;
  const dataStream = T.stream('statuses/filter', { follow: [targetUser, myBot] });

  dataStream.on('tweet', async(tweet) => {
    if(tweet.in_reply_to_user_id_str === myBot || tweet.user.id_str === targetUser)
    {
      console.log('tweeted');
     
      const randomNumber = Math.ceil(Math.random() * 29);
      console.log(randomNumber);
      Tapquotes.findById(randomNumber)
        .then(randomQuote => {
          T.post('media/upload', { media_data: b64content }, (err, data, response) => {
            const mediaIdStr = data.media_id_string;
            const altText = 'TAP LIVES';
            const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
            T.post('media/metadata/create', meta_params, (err, data, response) => {
              if(!err) {
                const params = { status: `@${tweet.user.screen_name}\n ${randomQuote.quote}\n -${randomQuote.character}\n ${randomQuote.hashtags}`, media_ids:[mediaIdStr], in_reply_to_status_id: tweet.id_str };
                T.post('statuses/update', params, (err, data, response) => {
                  console.log(data);
                });
              } else console.log(err);
            });
          });
        });

      
    }
  
  });



};
