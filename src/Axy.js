"use strict";

const { Client, Collection } = require("discord.js");
const createDB = require("better-sqlite3");

const CommandHandler = require('./handlers/CommandHandler.js');
const EventHandler = require('./handlers/EventHandler.js')

const { assign } = Object;

class Axy extends Client {
  constructor({
     token,
     dbPath,
     prefix,

     eventsPath,
     commandsPath 
  }) {
    super({ intents: 513 });

    assign(this, {
      token,
      dbPath,
      prefix,

      commands: new Collection(),
      util: require("util"),

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

  async connectDatabase() {
    const { dbPath } = this;
    const db = this.db = createDB(dbPath);
    db.prepare("CREATE TABLE IF NOT EXISTS economia (id INTEGER PRIMARY KEY AUTOINCREMENT);");
  }

  async start() {
    await this.createHandlers();
    await this.loadHandlers();

    await this.connectDatabase();
    
    await super.login(this.token);
  }
}

module.exports = Axy;