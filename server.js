const app = require('./lib/app');
const pool = require('./lib/utils/pool');

const PORT = process.env.PORT || 7890;
const twitBot = require('./lib/Twitter/twit');

try {
  twitBot();

} catch(error){
  console.log(error.message);
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('one louder');
});

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
