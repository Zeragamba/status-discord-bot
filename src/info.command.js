const ChaosCore = require('chaos-core');

class InfoCommand extends ChaosCore.Command {
  constructor(chaos) {
    super(chaos, {
      name: 'info',
      description: "Get info about me.",
    });
  }

  run(context, response) {
    response.send({
      content:
        "**STATUS**: Providing info about me.\n" +
        "I am STATUS. I assist patrons of this guild. For help, speak `!help` and I will tell you what I can do.",
    });
  }
}

module.exports = InfoCommand;
