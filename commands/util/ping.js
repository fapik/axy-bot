module.exports = {
  name: 'ping',
  run: async(axy, message, args) => {
    const { channel } = message;
    throw "teste";
    channel.send('<@${user.id}> pong! ' + axy.ws.ping)

  }
}