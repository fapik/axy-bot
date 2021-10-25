module.exports = (axy) => {
  console.log('teste')
  axy.on("messageCreate", (message) => {
    const {
       author,
    
       content,
       channel
    } = message
    
    if(author.bot) return;
    if(content.indexOf(axy.prefix) != 0) return;

    const args = content.trim().slice(axy.prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
    const cmd = axy.commands.get(command);
    if(cmd) {
      cmd.run(axy, message, args)
    }
  })
}