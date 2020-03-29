const {Service} = require('chaos-core');

const DiceGroup = require('../lib/dice-group');

class DiceRollerService extends Service {
  roll(formula) {
    let result = 0;
    let diceGroups = this.parse(formula);

    diceGroups.forEach(({operator, diceGroup}) => {
      diceGroup.roll();

      switch (operator) {
        case '+':
          result = result + diceGroup.result;
          break;
        case '-':
          result = result - diceGroup.result;
          break;
        case '/':
          result = result / diceGroup.result;
          break;
        case '*':
        case 'x':
          result = result * diceGroup.result;
          break;
        default:
          throw TypeError(`Unknown dice operator ${operator}`);
      }
    });

    return {
      diceGroups: diceGroups,
      result: result,
    };
  }

  parse(formula) {
    if (!formula) return [];

    const DICE_REGEX = /([+\-/*x])?(?:([ad])d(\d+|%)|(?:(\d+))?(?:d(\d+|%))?(?:(kh|kl)(\d+)?)?)/g;
    const regexGroups = {
      FORMULA: 0,
      OPERATOR: 1,

      ADV_DIS: 2,
      ADV_DIS_SIDES: 3,

      COUNT: 4,
      SIDES: 5,
      KEEP: 6,
      KEEP_COUNT: 7,
    };

    let matchGroups = formula
      .toLowerCase()
      .replace(/\s/g, '')
      .matchAll(DICE_REGEX);

    return [...matchGroups]
      .filter((matchGroup) => matchGroup[0] !== "")
      .map((matchGroup, index) => {
        let match = {
          formula: matchGroup[regexGroups.FORMULA],
          subFormula: null,
          operator: matchGroup[regexGroups.OPERATOR] || '+',
          count: matchGroup[regexGroups.COUNT] || 1,
          sides: matchGroup[regexGroups.SIDES] || null,
          keepHigh: null,
          keepLow: null,
        };

        if (index === 0 && match.operator !== '+' && match.operator !== '-') {
          throw TypeError("A formula must start with '+' or '-'");
        }

        if (matchGroup[regexGroups.ADV_DIS]) {
          match.count = 2;
          match.sides = matchGroup[regexGroups.ADV_DIS_SIDES];
          match.keepHigh = matchGroup[regexGroups.ADV_DIS] === "a" ? 1 : null;
          match.keepLow = matchGroup[regexGroups.ADV_DIS] === "d" ? 1 : null;
        } else if (matchGroup[regexGroups.KEEP]) {
          if (matchGroup[regexGroups.KEEP] === "kh") {
            match.keepHigh = matchGroup[regexGroups.KEEP_COUNT] || 1;
          } else {
            match.keepLow = matchGroup[regexGroups.KEEP_COUNT] || 1;
          }
        }

        return {
          operator: match.operator,
          diceGroup: new DiceGroup(match),
        };
      });
  }
}

module.exports = DiceRollerService;
