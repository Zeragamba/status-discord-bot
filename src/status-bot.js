const ChaosCore = require('chaos-core');
const Path = require('path');

const packageJson = require('../package');

const plugins = [
  require('chaos-plugin-user-roles'),
  require('./plugins/dice-roller'),
];

const commands = [
  require('./info.command'),
];

const defaultConfig = {
  ownerUserId: null,
  loginToken: null,

  logger: {
    level: 'info',
  },

  dataSource: {
    type: 'disk',
    dataDir: Path.join(__dirname, '../data'),
  },

  strings: require('./strings'),
};

class StatusBot extends ChaosCore {
  constructor(config) {
    super({
      ...defaultConfig,
      ...config,
      plugins,
      commands,
    });

    this.addCommand('core', require('./info.command'));

    this.on('chaos.listen', () => this.discord.user.setPresence({
      game: {
        name: `v${packageJson.version}`,
      },
    }));
  }
}

module.exports = StatusBot;
