const Axy = require('./src/Axy.js');

main();

async function main() {
  const token = process.env.AXY_TOKEN;
  const prefix = '.'

  const eventsPath = `${__dirname}/events`;
  const commandsPath = `${__dirname}/commands`

  const opts = { 
    token, 
    prefix,

    eventsPath,
    commandsPath
  }
  const axy = new Axy(opts);
  await axy.start();
}
