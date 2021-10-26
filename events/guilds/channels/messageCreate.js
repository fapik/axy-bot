module.exports = (axy) => {
  console.log('teste')
  axy.on("messageCreate", async(message) => {
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
    const handleErr = (error) => message.channel.send(`Algo deu muuuuuuuuuuuuuito errado ao tentar executar este comando... \`${error}\` reporte esse bug em https://github.com/fapik/axy-bot/issues.`)
    if(cmd) {
      try {
         const running = cmd.run(axy, message, args)
          if(running instanceof Promise) running.catch(handleErr)
      } catch(err) {
        handleErr(err)
      }
    }
  })
}