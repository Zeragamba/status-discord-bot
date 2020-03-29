describe('DiceRollerService', function () {
  beforeEach(function () {
    this.chaos = createChaosBotStub();
    this.diceRollerService = this.chaos.getService('diceRoller', 'DiceRollerService');
  });

  describe('#parse', function () {
    const formulas = {
      '1': [
        {operator: "+", diceGroup: {count: 1, sides: null}},
      ],
      '1 + 5': [
        {operator: "+", diceGroup: {count: 1, sides: null}},
        {operator: "+", diceGroup: {count: 5, sides: null}},
      ],
      'd6': [
        {operator: "+", diceGroup: {count: 1, sides: 6}},
      ],
      '4d6': [
        {operator: "+", diceGroup: {count: 4, sides: 6}},
      ],
      'd%': [
        {operator: "+", diceGroup: {count: 1, sides: 100}},
      ],
      '4d6 kh3': [
        {operator: "+", diceGroup: {count: 4, sides: 6, keepHigh: 3}},
      ],
      '4d6 kl3': [
        {operator: "+", diceGroup: {count: 4, sides: 6, keepLow: 3}},
      ],
      'd6 + 5': [
        {operator: "+", diceGroup: {count: 1, sides: 6}},
        {operator: "+", diceGroup: {count: 5, sides: null}},
      ],
      'd6 - 5': [
        {operator: "+", diceGroup: {count: 1, sides: 6}},
        {operator: "-", diceGroup: {count: 5, sides: null}},
      ],
      'd6 + d10': [
        {operator: "+", diceGroup: {count: 1, sides: 6}},
        {operator: "+", diceGroup: {count: 1, sides: 10}},
      ],
      'ad20': [
        {operator: "+", diceGroup: {count: 2, sides: 20, keepHigh: 1}},
      ],
      'dd20': [
        {operator: "+", diceGroup: {count: 2, sides: 20, keepLow: 1}},
      ],
    };

    Object.entries(formulas).forEach(([formula, dice]) => {
      context(`with formula "${formula}"`, function () {
        it('returns the right dice data', function () {
          expect(this.diceRollerService.parse(formula))
            .to.containSubset(dice);
        });
      });
    });
  });

  describe('#roll', function () {
    const rollsPerTest = 10000;
    const formulas = {
      '6': {
        equal: 6, groups: [
          {operator: '+', diceGroup: {count: 6, sides: null}},
        ],
      },
      'd6': {
        min: 1, max: 6, groups: [
          {operator: '+', diceGroup: {count: 1, sides: 6}},
        ],
      },
      'd%': {
        min: 1, max: 100, groups: [
          {operator: '+', diceGroup: {count: 1, sides: 100}},
        ],
      },
      'd6 + 2': {
        min: 3, max: 8, groups: [
          {operator: '+', diceGroup: {count: 1, sides: 6}},
          {operator: '+', diceGroup: {count: 2, sides: null}},
        ],
      },
      'd6 - 2': {
        min: -1, max: 4, groups: [
          {operator: '+', diceGroup: {count: 1, sides: 6}},
          {operator: '-', diceGroup: {count: 2, sides: null}},
        ],
      },
      'd6 / 2': {
        min: -1, max: 4, groups: [
          {operator: '+', diceGroup: {count: 1, sides: 6}},
          {operator: '/', diceGroup: {count: 2, sides: null}},
        ],
      },
      'd6 * 2': {
        min: 2, max: 12, groups: [
          {operator: '+', diceGroup: {count: 1, sides: 6}},
          {operator: '*', diceGroup: {count: 2, sides: null}},
        ],
      },
      'd6 x 2': {
        min: 2, max: 12, groups: [
          {operator: '+', diceGroup: {count: 1, sides: 6}},
          {operator: 'x', diceGroup: {count: 2, sides: null}},
        ],
      },
      '2d6': {
        min: 2, max: 12, groups: [
          {operator: '+', diceGroup: {count: 2, sides: 6}},
        ],
      },
      'd20 + d6': {
        min: 2, max: 26, groups: [
          {operator: '+', diceGroup: {count: 1, sides: 20}},
          {operator: '+', diceGroup: {count: 1, sides: 6}},
        ],
      },
      'd20 - d6': {
        min: -5, max: 19, groups: [
          {operator: '+', diceGroup: {count: 1, sides: 20}},
          {operator: '-', diceGroup: {count: 1, sides: 6}},
        ],
      },
      '2d20kh': {
        min: 1, max: 20, groups: [
          {operator: '+', diceGroup: {count: 2, sides: 20, keepHigh: 1}},
        ],
      },
      '2d20kl': {
        min: 1, max: 20, groups: [
          {operator: '+', diceGroup: {count: 2, sides: 20, keepLow: 1}},
        ],
      },
      'Ad20': {
        min: 1, max: 20, groups: [
          {operator: '+', diceGroup: {count: 2, sides: 20, keepHigh: 1}},
        ],
      },
      'Dd20': {
        min: 1, max: 20, groups: [
          {operator: '+', diceGroup: {count: 2, sides: 20, keepLow: 1}},
        ],
      },
    };

    Object.entries(formulas).forEach(([formula, {equal, min, max, groups}]) => {
      context(`with formula "${formula}"`, function () {
        it(`rolls correct set of dice`, function () {
          for (let i = 0; i < rollsPerTest; i++) {
            let {diceGroups} = this.diceRollerService.roll(formula);
            expect(diceGroups).to.containSubset(groups);
          }
        });

        if (equal) {
          it(`returns ${equal}`, function () {
            for (let i = 0; i < rollsPerTest; i++) {
              let {result} = this.diceRollerService.roll(formula);
              expect(result).to.eq(equal);
            }
          });
        } else {
          it(`returns a value between ${min} and ${max}`, function () {
            for (let i = 0; i < rollsPerTest; i++) {
              let {result} = this.diceRollerService.roll(formula);
              expect(result).to.be.within(min, max);
            }
          });
        }
      });
    });
  });
});
