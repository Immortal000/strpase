// @ts-nocheck
class basicStr {
    constructor(string) {
        this.string = string;
    }

    /**
     * Returns the first set amount of characters
     * @param {String} substringLength : Length of the sub string needed.
     *  
     */
    start(substringLength) {
        return this.string.substring(0, substringLength);
    }

    /**
     * Returns the last set amount of characters
     * @param {*} substringLength : Length of the sub string needed.
     */
    end(substringLength) {
        let string = this.string.split("").reverse().join("");
        return string.substring(0, substringLength).split("").reverse().join("");
    }

    /**
     * Reverses the string 
     */
    reverse() {
        return this.string.split("").reverse().join("");
    }

    /**
     * Find all the matching characters
     * @param {String} character : Character to be matched
     * @param {Number} start : Start Index of the substring
     * @param {Number} end : End index of the substring
     * 
     * Needed Developments: Get indexes of the matched characters between given two indexes
     */

    find(character, start = 0, end = this.string.length) {
        let indexes = [];
        // let requiredString = this.string.substring(start, end)
        for (let index = 0; index < this.string.length; index++) {
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
        return indexes;
    }

    /**
     * Returns the substring between 2 given indexes
     * @param {Number} start : Start Index
     * @param {Number} end : End Index
     */
    // between(start, end) {
    //     let regexp = new RegExp("\\" + start + "(.*?)" + "\\" + end, "g");
    //     let result = Array.from(this.string.matchAll(regexp), (m) => m[1]);
    //     return result;
    // }

    /**
     * Logs everything to the right of a particular string based on the occurence Index.
     * @param {String} substring : Substring to match
     * @param {Number} occurence : Number of occurence
     */
    toRight(substring, occurence = 0) {
        let results = [];
        for (let index = 0; index < this.string.length; index++) {
            if (this.string.substring(index, index + substring.length) == substring) {
                results.push(index + substring.length);
            }
        }
        return this.string.substring(results[occurence], this.string.length);
    }

    /**
     * Logs everything to the left of a particular string based on the occurence index
     * @param {String} substring : Substring to Match
     * @param {Number} occurence : Number of occurence 
     */
    toLeft(substring, occurence = 0) {
        let results = [];
        for (let index = 0; index < this.string.length; index++) {
            if (this.string.substring(index, index + substring.length) == substring) {
                results.push(index);
            }
        }
        return this.string.substring(0, results[occurence]);
    }

    /**
     * Cuts off everything to the left of the substring based on the occurence Index
     * @param {String} substring 
     * @param {Number} occurence 
     */
    cutLeft(substring, occurence = 0) {
        let results = [];
        for (let index = 0; index < this.string.length; index++) {
            if (this.string.substring(index, index + substring.length) == substring) {
                results.push(index);
            }
        }
        return this.string.substring(results[occurence], this.string.length);
    }

    /**
    * Cuts off everything to the right of the substring based on the occurence Index
    * @param {String} substring 
    * @param {Number} occurence 
    */
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

    /**
     * Replaces substrings based on their occurence numbers
     * @param {Int32List} repIndex : Array of indexes to replace 
     * @param {String} substring : Substring to be replaced
     */
    repCertain(repIndex, substring) {
        let string = this.string;
        let data = this.getEssentialData(substring);
        let essentialData = data.allOccurences;
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

    /**
     * Replace certain strings counts
     * @param {Number} count : Number of occurences need to be replaced
     * @param {String} substring : Substring to be replaced.
     */
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

    /**
     * Replace all instances of substring
     * @param {String} substring 
     */
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

    /**
     * Replaces the substrings on a certain index
     * @param {Number} index : Index to the substring 
     * @param {Boolean} all : If to replace all the instances
     */
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

module.exports = {
    basicFunctions: basicStr,
    replaceFunctions: repStr,
    extendedFunctions: conStr
}
