const ChaosCore = require('chaos-core');
const Path = require('path');

const packageJson = require('../package');
const diceRollerPlugin = require('./plugins/dice-roller');

const plugins = [
  diceRollerPlugin,
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

  responseStrings: require('./strings'),
};

class StatusBot extends ChaosCore {
  constructor(config) {
    super({
      ...defaultConfig,
      ...config,
      plugins,
    });

    this.on('chaos.listen', () => this.discord.user.setPresence({
      game: {
        name: `v${packageJson.version}`,
      },
    }));
  }
}

module.exports = StatusBot;
