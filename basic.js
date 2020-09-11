// @ts-nocheck
class basicStr {
  constructor(string) {
    this.string = string;
  }

  // Returns the number of characters from the start of the string
  start(characters) {
    return this.string.substring(0, characters);
  }

  // Returns the number of characters from the end of the string
  end(characters) {
    let string = this.string.split("").reverse().join("");
    return string.substring(0, characters).split("").reverse().join("");
  }

  // Reverses the string
  reverse() {
    return this.string.split("").reverse().join("");
  }

  // Finds all the matching cases
  find(character, count = this.string.length, end) {
    let indexes = [];
    for (let index = 0; index < count; index++) {
      let check = this.string.substring(index, index + character.length);
      if (check == character) {
        if (character.length > 1) {
          let indexTuple = [index, index + character.length - 1];
          indexes.push(indexTuple);
        } else {
          let currentIndex = index;
          indexes.push(currentIndex);
        }
      }
    }
    let result = end ? indexes.reverse().slice(0, count).reverse() : indexes.slice(0, count);
    return result;
  }

  // Finds everything between given two characters
  between(start, end) {
    let regexp = new RegExp("\\" + start + "(.*?)" + "\\" + end, "g");
    let result = Array.from(this.string.matchAll(regexp), (m) => m[1]);
    return result;
  }

  // Logs everything to the right of a particular string based on the occurence index
  toRight(substring, occurence = 0) {
    let results = [];
    for (let index = 0; index < this.string.length; index++) {
      if (this.string.substring(index, index + substring.length) == substring) {
        results.push(index + substring.length);
      }
    }
    return this.string.substring(results[occurence], this.string.length);
  }

  // Logs everything to the left of a particular string based on the occurence index
  toLeft(substring, occurence = 0) {
    let results = [];
    for (let index = 0; index < this.string.length; index++) {
      if (this.string.substring(index, index + substring.length) == substring) {
        results.push(index);
      }
    }
    return this.string.substring(0, results[occurence]);
  }

  // Cuts off everything to the left of the string
  cutLeft(substring, occurence = 0) {
    let results = [];
    for (let index = 0; index < this.string.length; index++) {
      if (this.string.substring(index, index + substring.length) == substring) {
        results.push(index);
      }
    }
    return this.string.substring(results[occurence], this.string.length);
  }

  // Cuts off everything to the right of the string
  cutRight(substring, occurence = 0) {
    let results = [];
    for (let index = 0; index < this.string.length; index++) {
      if (this.string.substring(index, index + substring.length) == substring) {
        results.push(index + substring.length);
      }
    }
    return this.string.substring(0, results[occurence]);
  }
}

module.exports = basicStr;
