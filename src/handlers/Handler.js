const { readdir, stat } = require("fs").promises;
const { assign } = Object;

class Handler {
  constructor({ dir }) {
    assign(this, {
      dir
    })
  }
  async get() {
    const { dir } = this;
    console.log(dir)
    const required = [];
    const files = await readdir(dir);
    for(const file of files) {
      const stats = await stat(dir + '/' + file);
      if(stats.isDirectory()) {
        const handler = new Handler({ dir: dir + '/' + file });
        const reqrd = await handler.get();
        required.push(...reqrd);
      } else if(stats.isFile() && file.endsWith(".js")) {
        const reqrd = require(dir+'/'+file);
        required.push(reqrd)
      }
    }

    return required;
  }
}

module.exports = Handler