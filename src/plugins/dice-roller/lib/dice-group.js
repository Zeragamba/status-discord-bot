class DiceGroup {
  constructor({count, sides, keepHigh, keepLow}) {
    this.count = 1;
    this.sides = null;
    this.keepHigh = null;
    this.keepLow = null;
    this._rolls = [];
    this._result = null;

    if (count) {
      this.count = parseInt(count);
    }

    if (sides) {
      if (sides === '%') {
        this.sides = 100;
      } else {
        this.sides = parseInt(sides);
      }
    }

    if (keepHigh) {
      this.keepHigh = parseInt(keepHigh);
    }

    if (keepLow) {
      this.keepLow = parseInt(keepLow);
    }

    this.atAdv = this.count === 2 && this.keepHigh === 1;
    this.atDis = this.count === 2 && this.keepLow === 1;
  }

  get formula() {
    if (!this.sides) return this.count.toString();
    let formula = "";

    if (this.atAdv) {
      formula += `Ad${this.sides}`;
    } else if (this.atDis) {
      formula += `Dd${this.sides}`;
    } else {
      if (this.count > 1) {
        formula += this.count;
      }

      formula += `d${this.sides}`;

      if (this.keepHigh) {
        formula += 'kh';
        if (this.keepHigh > 1) formula += this.keepHigh;
      } else if (this.keepLow) {
        formula += 'kl';
        if (this.keepLow > 1) formula += this.keepLow;
      }
    }

    return formula;
  }

  get result() {
    if (this._result === null) this.roll();
    return this._result;
  }

  get rolls() {
    if (this._result === null) this.roll();
    return this._rolls;
  }

  roll() {
    this._rolls = [];

    if (!this.sides) {
      this._result = this.count;
      this._rolls.push({
        value: this.count,
        sides: null,
        included: true,
      });
      return;
    }

    for (let i = 0; i < this.count; i++) {
      this._rolls.push({
        value: Math.floor(Math.random() * this.sides) + 1,
        sides: this.sides,
        included: true,
      });
    }

    if (this.keepHigh || this.keepLow) {
      this._rolls.forEach((roll) => roll.included = false);

      let sortedRolls = [...this._rolls]
        .sort((a, b) => b.value - a.value);

      if (this.keepHigh) {
        sortedRolls
          .slice(0, this.keepHigh)
          .forEach((roll) => roll.included = true);
      } else if (this.keepLow) {
        sortedRolls
          .slice(-this.keepLow)
          .forEach((roll) => roll.included = true);
      }
    }

    this._result = this._rolls
      .filter((r) => r.included)
      .reduce((s, r) => s + r.value, 0);
  }
}

module.exports = DiceGroup;
