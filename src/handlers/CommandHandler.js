const Handler = require('./Handler.js');
const { assign } = Object;

class CommandHandler extends Handler {
  constructor({ dir, axy }) {
    super({ dir });

    assign(this, {
      axy
    })
  }

  async load() {
    const commands = this.axy.commands;
    const cmds = await super.get();
    for(const cmd of cmds) {
      console.log(cmd)
      const {name, aliases } = cmd;
      const add = (n) => commands.set(n, cmd);
      add(name);
      if(aliases) aliases.forEach(add);
    }

    return commands;
  }
}

module.exports = CommandHandler