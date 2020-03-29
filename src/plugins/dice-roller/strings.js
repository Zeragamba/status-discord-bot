module.exports = {
  diceRoller: {
    commands: {
      roll: {
        diceRolled: ({formula, rolls, result}) =>
          `Rolling dice...\n` +
          `Result: \`${formula}\` = ${result}\n` +
          `Rolls: ${rolls} = ${result}`,
      },
    },
  },
};
