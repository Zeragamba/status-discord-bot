const {Command} = require('chaos-core');
const {of} = require('rxjs');
const {map, flatMap} = require('rxjs/operators');

class RollCommand extends Command {
  constructor(chaos) {
    super(chaos, {
      name: 'roll',
      description: 'Roll some dice',

      args: [
        {
          name: 'formula',
          description: 'A d20 system dice formula (eg. d6 + 6)',
          required: true,
          greedy: true,
        },
      ],
    });
  }

  get strings() {
    return super.strings.diceRoller.commands.roll;
  }

  run(context, response) {
    let diceRollerService = this.chaos.getService('diceRoller', 'DiceRollerService');

    return of(context.args.formula).pipe(
      map((formula) => diceRollerService.roll(formula)),
      flatMap((rollData) => {
        let result = rollData.result;
        let formula = this.displayFormula(rollData.diceGroups);
        let rolls = this.displayRolls(rollData.diceGroups);

        return response.send({
          content: this.strings.diceRolled({formula, rolls, result}),
        });
      }),
    );
  }

  displayFormula(diceGroups) {
    return diceGroups.reduce((formula, {operator, diceGroup}, index) => {
      if (index === 0) {
        if (operator === '+') {
          return formula + diceGroup.formula;
        } else {
          return formula + `-${diceGroup.formula}`;
        }
      } else {
        return formula + ` ${operator} ${diceGroup.formula}`;
      }
    }, "");
  }

  displayRolls(diceGroups) {
    return diceGroups.reduce((formula, {operator, diceGroup}, index) => {
      let rollStrs = diceGroup.rolls.map((roll) => {
        let rollStr;

        if (roll.value === 1) {
          rollStr = `\`${roll.value}\``;
        } else if (roll.value === roll.sides) {
          rollStr = `**${roll.value}**`;
        } else {
          rollStr = `${roll.value}`;
        }

        if (!roll.included) {
          rollStr = `~~${rollStr}~~`;
        }

        return rollStr;
      });

      if (index === 0) {
        if (operator === '+') {
          return formula + `(${rollStrs.join(' ')})`;
        } else {
          return formula + `- (${rollStrs.join(' ')})`;
        }
      } else {
        return formula + ` ${operator} (${rollStrs.join(' ')})`;
      }
    }, "");
  }
}

module.exports = RollCommand;
