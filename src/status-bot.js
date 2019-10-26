const ChaosCore = require('chaos-core');
const Path = require('path');

const packageJson = require('../package');

const plugins = [

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
