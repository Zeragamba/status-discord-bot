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
        "*Status: Providing info.*\n" +
        "I am Status, and I assist patrons on this Discord server.\n" +
        "Speak `!help`, and I will let you know I can do for you.\n" +
        "\n" +
        "(Profile Pic by @BuckMoonArt: <https://twitter.com/BuckMoonArt/status/992800943719657473>)",
    });
  }
}

module.exports = InfoCommand;
