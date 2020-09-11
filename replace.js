// @ts-nocheck
class repStr {
  constructor(string, replacestring) {
    this.string = string;
    this.replacestring = replacestring;
  }

  getEssentialData(substring) {
    let data = {
      string: this.string,
      substring: substring,
      replacestring: this.replacestring,
      allOccurences: [],
    };
    let substringLength = substring.length;
    let occurenceCount = 0;
    // Searches for all occurences for the substring
    for (let index = 0; index <= this.string.length; index++) {
      // Checks for each sliced string
      let check = this.string.substring(index, index + substringLength);
      if (check == substring) {
        // An array with the start and the end index of the substring we are searching for
        let currentIndex = [index, index + substringLength - 1];
        let indexObject = { count: occurenceCount, indexes: currentIndex };
        data.allOccurences.push(indexObject);
        ++occurenceCount;
      }
    }
    return data;
  }

  // Replaces certain indexes
  repCertain(repIndex, substring) {
    let string = this.string;
    let data = this.getEssentialData(substring);
    let essentialData = data.allOccurences;
    let difference = substring.length - this.replacestring.length;
    // Changes the indexes as though replaced everything
    essentialData.forEach((element) => {
      element.indexes[0] = element.indexes[0] - (substring.length - this.replacestring.length) * element.count;
    });
    // Iterates over the repIndex array
    repIndex.forEach((element, index) => {
      // Finds the object which matches the count and the element
      let obj = essentialData.find((object) => object.count == element);
      // Changes the indexes of the array specific to the repIndex
      obj.indexes[0] = obj.indexes[0] + (element - index) * (substring.length - this.replacestring.length);
      obj.indexes[1] = obj.indexes[0] + (substring.length - this.replacestring.length);
      // Replaces the string after every iteration
      let start = string.substring(0, obj.indexes[0]);
      let end = string.substring(obj.indexes[1] + this.replacestring.length, string.length);
      string = `${start}${this.replacestring}${end}`;
    });
    // Return the data
    data["output"] = string;
    return data;
  }

  replaceStr(count, substring) {
    let data = this.getEssentialData(substring);
    let occurenceCount = 0;
    let string = this.string;
    while (occurenceCount != count) {
      string = string.replace(substring, this.replacestring);
      ++occurenceCount;
    }
    // Creating the finalized data object
    data["output"] = string;
    return data;
  }

  // Changes all the occurings of the string
  repAll(substring) {
    let string = this.string;
    let data = this.getEssentialData(substring);
    let essentialData = data.allOccurences;
    // Changes the indexes so the replace algorithm works
    essentialData.forEach((element) => {
      element.indexes[0] = element.indexes[0] - (substring.length - this.replacestring.length) * element.count;
      element.indexes[1] = element.indexes[0] + substring.length;
    });
    // Replaces the string as per the parameter
    essentialData.forEach((element) => {
      let front = string.substring(0, element.indexes[0]);
      let end = string.substring(element.indexes[1], string.length);
      string = `${front}${this.replacestring}${end}`;
    });
    data["output"] = string;
    return data;
  }

  // Replaces the character on the given index. All or one can be replaced.
  indexRep(index, all) {
    let substring = typeof index == "object" ? this.string.substring(index[0], index[1] + 1) : this.string[index];
    let data = this.getEssentialData(substring);
    if (all) {
      return this.repAll(substring);
    } else if (!all) {
      let front = this.string.substring(0, index);
      let end = this.string.substring(index + 1, this.string.length);
      let string = `${front}${this.replacestring}${end}`;
      data["output"] = string;
      return data;
    }
  }
}

module.exports = repStr;
