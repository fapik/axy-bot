const Axy = require('./src/Axy.js');
const args = process.argv.slice(1);
const parseEnv = args.indexOf('--parse-env') != (-1);

if(parseEnv) require('dotenv/config');

main();

async function main() {
  const token = process.env.AXY_TOKEN;
  const dbPath = process.env.AXY_DB_PATH;
  const prefix = '.'

  const eventsPath = `${__dirname}/events`;
  const commandsPath = `${__dirname}/commands`

  const opts = { 
    token,
    dbPath,
    prefix,

    eventsPath,
    commandsPath
  }
  const axy = new Axy(opts);
  await axy.start();
}
