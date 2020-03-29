module.exports = {
  name: "diceRoller",
  description: "Provides features for rolling dice for table top games",
  services: [require('./services/dice-roller-service.js')],
  commands: [require('./commands/roll.js')],
  strings: require('./strings'),
};
