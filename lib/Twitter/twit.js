/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const Twit = require('twit');
const fs = require('fs');

const Tapquotes = require('../models/tapquotes');
const tap = fs.readFileSync('./assets/tap.jpg', { encoding: 'base64' });
const bobbi = fs.readFileSync('./assets/bobbi.jpg', { encoding: 'base64' });
const david = fs.readFileSync('./assets/david.jpg', { encoding: 'base64' });
const derek = fs.readFileSync('./assets/derek.jpg', { encoding: 'base64' });
const Ian = fs.readFileSync('./assets/Ian.jpg', { encoding: 'base64' });
const jeanine = fs.readFileSync('./assets/jeanine.jpg', { encoding: 'base64' });
const marty = fs.readFileSync('./assets/marty.jpg', { encoding: 'base64' });
const mick = fs.readFileSync('./assets/mick.jpg', { encoding: 'base64' });
const mime = fs.readFileSync('./assets/mime.jpg', { encoding: 'base64' });
const nigel = fs.readFileSync('./assets/nigel.jpg', { encoding: 'base64' });
const terry = fs.readFileSync('./assets/terry.jpg', { encoding: 'base64' });
const viv = fs.readFileSync('./assets/viv.jpg', { encoding: 'base64' });
const security = fs.readFileSync('./assets/airport_security.jpeg', { encoding: 'base64' });
const bob = fs.readFileSync('./assets/bob.jpg', { encoding: 'base64' });
const Tommy = fs.readFileSync('./assets/Tommy.jpg', { encoding: 'base64' });
const Tucker = fs.readFileSync('./assets/Tucker.jpg', { encoding: 'base64' });
const artie = fs.readFileSync('./assets/artie.jpg', { encoding: 'base64' });

module.exports = function twitBot(){

  const T = new Twit({
    consumer_key:  process.env.APPLICATION_CONSUMER_KEY,
    consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });

  const myBot = process.env.BOT_ID;
  const targetUser = process.env.TWITTER_FOLLOW_USER;
  const targetUser2 = process.env.TWITTER_FOLLOW_USER_TWO;
  const dataStream = T.stream('statuses/filter', { follow: [targetUser, targetUser2, myBot] });
  let quoteId = 1;
  dataStream.on('tweet', async(tweet) => {
    if(tweet.in_reply_to_user_id_str === myBot)
    {
      
      console.log('tweeted');
      console.log(quoteId);
  
      Tapquotes.findById(quoteId)
      
        .then(randomQuote => {
          let pic = tap;
          if(quoteId < 52){
            quoteId++;

          } else {
            quoteId = 1;
          }
          if(randomQuote.character === 'Nigel Tufnel') pic = nigel;
          if(randomQuote.character === 'David St Hubbins') pic = david;
          if(randomQuote.character === 'Derek Smalls') pic = derek;
          if(randomQuote.character === 'Viv Savage') pic = viv;
          if(randomQuote.character === 'Ian Faith') pic = Ian;
          if(randomQuote.character === 'Mick Shrimpton') pic = mick;
          if(randomQuote.character === 'Jeanine Pettibone') pic = jeanine;
          if(randomQuote.character === 'Marty DiBergi') pic = marty;
          if(randomQuote.character === 'Terry Ladd') pic = terry;
          if(randomQuote.character === 'Morty the Mime') pic = mime;
          if(randomQuote.character === 'Bobbi Fleckman') pic = bobbi;
          if(randomQuote.character === 'Airport Security Officer') pic = security;
          if(randomQuote.character === 'Lt. Bob Hookstratten') pic = bob;
          if(randomQuote.character === 'Tucker Smitty Brown') pic = Tucker;
          if(randomQuote.character === 'Tommy Pischedda') pic = Tommy;
          if(randomQuote.character === 'Artie Fufkin') pic = artie;
          
          T.post('media/upload', { media_data:  pic }, (err, data, response) => {
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

      
    } else if(tweet.user.id_str === targetUser){
      console.log('tweeted line 46');
      
      const randomNumber = Math.ceil(Math.random() * 52);
      console.log(randomNumber);
      Tapquotes.findById(randomNumber)
       
        .then(randomQuote => {
          let pic = tap;
          if(quoteId < 52){
            quoteId++;
          } else {
            quoteId = 1;
          }
          if(randomQuote.character === 'Nigel Tufnel') pic = nigel;
          if(randomQuote.character === 'David St Hubbins') pic = david;
          if(randomQuote.character === 'Derek Smalls') pic = derek;
          if(randomQuote.character === 'Viv Savage') pic = viv;
          if(randomQuote.character === 'Ian Faith') pic = Ian;
          if(randomQuote.character === 'Mick Shrimpton') pic = mick;
          if(randomQuote.character === 'Jeanine Pettibone') pic = jeanine;
          if(randomQuote.character === 'Marty DiBergi') pic = marty;
          if(randomQuote.character === 'Terry Ladd') pic = terry;
          if(randomQuote.character === 'Morty the Mime') pic = mime;
          if(randomQuote.character === 'Bobbi Fleckman') pic = bobbi;
          if(randomQuote.character === 'Airport Security Officer') pic = security;
          if(randomQuote.character === 'Lt. Bob Hookstratten') pic = bob;
          if(randomQuote.character === 'Tucker Smitty Brown') pic = Tucker;
          if(randomQuote.character === 'Tommy Pischedda') pic = Tommy;
          if(randomQuote.character === 'Artie Fufkin') pic = artie;
          
          T.post('media/upload', { media_data:  pic  }, (err, data, response) => {
            const mediaIdStr = data.media_id_string;
            const altText = 'TAP LIVES';
            const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
            T.post('media/metadata/create', meta_params, (err, data, response) => {
              if(!err) {
                const params = { status: `${randomQuote.quote}\n -${randomQuote.character}\n ${randomQuote.hashtags}`, media_ids:[mediaIdStr], in_reply_to_status_id: tweet.id_str };
                T.post('statuses/update', params, (err, data, response) => {
                  console.log(data);
                });
              } else console.log(err);
            });
          });
        });
    } else if(tweet.user.id_str === targetUser2){
      console.log('tweeted line 46');
     
      const randomNumber = Math.ceil(Math.random() * 52);
      console.log(randomNumber);
      Tapquotes.findById(randomNumber)
       
        .then(randomQuote => {
          let pic = tap;
          if(quoteId < 52){
            quoteId++;
          } else {
            quoteId = 1;
          }
          if(randomQuote.character === 'Nigel Tufnel') pic = nigel;
          if(randomQuote.character === 'David St Hubbins') pic = david;
          if(randomQuote.character === 'Derek Smalls') pic = derek;
          if(randomQuote.character === 'Viv Savage') pic = viv;
          if(randomQuote.character === 'Ian Faith') pic = Ian;
          if(randomQuote.character === 'Mick Shrimpton') pic = mick;
          if(randomQuote.character === 'Jeanine Pettibone') pic = jeanine;
          if(randomQuote.character === 'Marty DiBergi') pic = marty;
          if(randomQuote.character === 'Terry Ladd') pic = terry;
          if(randomQuote.character === 'Morty the Mime') pic = mime;
          if(randomQuote.character === 'Bobbi Fleckman') pic = bobbi;
          if(randomQuote.character === 'Airport Security Officer') pic = security;
          if(randomQuote.character === 'Lt. Bob Hookstratten') pic = bob;
          if(randomQuote.character === 'Tucker Smitty Brown') pic = Tucker;
          if(randomQuote.character === 'Tommy Pischedda') pic = Tommy;
          if(randomQuote.character === 'Artie Fufkin') pic = artie;
          
          T.post('media/upload', { media_data:  pic  }, (err, data, response) => {
            const mediaIdStr = data.media_id_string;
            const altText = 'TAP LIVES';
            const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
            T.post('media/metadata/create', meta_params, (err, data, response) => {
              if(!err) {
                const params = { status: `${randomQuote.quote}\n -${randomQuote.character}\n ${randomQuote.hashtags}`, media_ids:[mediaIdStr], in_reply_to_status_id: tweet.id_str };
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
