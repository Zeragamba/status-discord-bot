module.exports = {
  diceRoller: {
    commands: {
      roll: {
        diceRolled: ({formula, rolls, result}) =>
          `*Status: Rolling Dice...*\n` +
          `Result:\n` +
          `\`${formula}\` = ${result}\n` +
          `Rolls:\n` +
          `${rolls}`,
      },
    },
  },
  userRoles: {
    commands: {
      join: {
        addedToRole: ({roleName}) =>
          `*Status: Adding role...*\n` +
          `I have added you to the role ${roleName}.`,
      },
      leave: {
        removedFromRole: ({roleName}) =>
          `*Status: Removing role...*\n` +
          `I have removed you from the role ${roleName}.`,
      },
      roles: {
        availableToJoin: () =>
          `*Status: Listing roles...*\n` +
          `Here are all the roles you may join:`,
        allRolesJoined: () =>
          `*[All roles joined]*`,
      },
    },
  },
};
