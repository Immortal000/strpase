// let { basicFunctions, replaceFunctions, extendedFunctions } = require("./strparse")
let str = require("./strparse");

let firstString = new str.replaceFunctions("strparse!strparse!", "$");
console.log(firstString.indexRep(2, false).output);