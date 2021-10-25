module.exports = {
  name: 'ping',
  run: async(axy, message, args) => {
    const { channel } = message;

    channel.send('Pong! ' + axy.ws.ping)
  }
}