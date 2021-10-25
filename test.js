const CommandHandler = require("./src/handlers/CommandHandler.js");

test()
async function test() {
  const ch = new CommandHandler({ dir: __dirname + '/src' });
  console.log(await ch.load())
}