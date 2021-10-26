
module.exports = {
  name: 'eval',
  aliases: ['e'],
  run: async(axy, message, args) => {
    if(message.author.id != 852922358170779658) return;
    args = args.join(" ");
    const evaled = eval(args);
    const inspected = axy.util.inspect(evaled);

    message.channel.send(inspected);
  }
}