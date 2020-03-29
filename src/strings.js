module.exports = {
  diceRoller: {
    commands: {
      roll: {
        diceRolled: ({formula, rolls, result}) =>
          `**STATUS**: ROLLING DICE...\n` +
          `Result: \`${formula}\` = ${result}\n` +
          `Rolls:\n` +
          `  ${rolls}\n` +
          `= ${result}`,
      },
    },
  },
};
