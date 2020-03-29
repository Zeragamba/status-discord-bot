const ChaosCore = require("chaos-core");
const chai = require('chai');
const chaiSubset = require('chai-subset');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const ChaosBot = require('../src/status-bot');
const localConfig = require('../config');

function createChaosBotStub(config = {}) {
  return ChaosCore.test.stubChaosBot(new ChaosBot({
    ...localConfig,
    logger: {level: 'warn'},
    dataSource: {type: 'memory'},
    ...config,
  }));
}

chai.use(sinonChai);
chai.use(chaiSubset);

global.sinon = sinon;
global.expect = chai.expect;

global.createChaosBotStub = createChaosBotStub;
