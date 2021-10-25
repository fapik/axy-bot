const Handler = require('./Handler.js');
const { assign } = Object;

class EventHandler extends Handler {
  constructor({ dir, axy }) {
    super({ dir });
    assign(this, {
      axy
    })
  }
  async load() {
    const { axy } = this;
    const events = await super.get();
    for(const event of events) {
      event(axy);
    }
    return axy;
  }
}

module.exports = EventHandler;