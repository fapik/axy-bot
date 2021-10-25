"use strict";

const { Client, Collection } = require("discord.js");

const CommandHandler = require('./handlers/CommandHandler.js');
const EventHandler = require('./handlers/EventHandler.js')

const { assign } = Object;

class Axy extends Client {
  constructor({
     token,
     prefix,

     eventsPath,
     commandsPath 
  }) {
    super({ intents: 513 });

    assign(this, {
      token,
      prefix,

      commands: new Collection(),

      eventsPath,
      commandsPath
    });
  }

  async loadHandlers() {
    const { eventHandler, commandHandler } = this;
    
    await eventHandler.load();
    await commandHandler.load();
  }

  async createHandlers() {
    const { eventsPath, commandsPath } = this;
    const axy = this;

    this.commandHandler = new CommandHandler({ dir: commandsPath, axy });
    this.eventHandler = new EventHandler({ dir: eventsPath, axy });
  }

  async start() {
    await this.createHandlers();
    await this.loadHandlers();
    
    await super.login(this.token);
  }
}

module.exports = Axy;