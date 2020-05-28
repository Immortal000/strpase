class conStr {
  constructor(string, count, join) {
    this.string = string;
    this.count = count;
    this.join = join;
  }

  times() {
    let string = this.string;
    let occ = 0;
    while (occ != this.count - 1) {
      string = `${string}${this.join}${this.string}`;
      ++occ;
    }
    return string;
  }
}


module.exports = conStr;
