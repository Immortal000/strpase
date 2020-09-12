# Str-parse 
String function with extra modifications. 
Installtion: `npm install str-parse`
___
# Usage
## Str-parse basic functions
```
let str= require("str-parse");
let newString = new str.basicFunctions("strparse!");
```
#### Return the first set amount of characters 
`String.start(index:Number)`
```
console.log(newString.start(5)) // strpa
```
#### Return the last set amount of characters 
`String.end(index:Number)`
```
console.log(newString.end(5)) // arse!
```
#### Reverse the string 
`String.reverse()`
```
console.log(newString.reverse()) // !esraprts
```
#### Find all the matching cases 
`String.find(substring:String)`
```
console.log(newString.find("r")) // [2,5]
console.log(newString.find("se")) // [[6,7]]
```
#### Log everything to the right of a particular string based on the occurrence Index
`String.toRight( substring:String, occurrenceCount = 0 )`
```
console.log(newString.toRight("r") // parse!
console.log(newString.toRight("r" ,1 ) // se!
``` 
#### Logs everything to the left of a particular string based on the occurrence index
`String.toLeft( substring:String, occurrenceCount = 0)`
#### Slice everything to the left/Right of the sub-string based on the occurrence Index
`String.cutLeft( substring:String, occurrenceCount = 0)`
```
console.log(newString.cutLeft("r")) // rparse!
console.log(newString.cutRight("r")) // str
```
## Replace Functions
```
let str = require("str-parse")
let newString = new str.replaceFunctions("strparse!strparse!", "$")
```
This constructor takes in 2 parameters. **string** and **replaceString**.
#### Replace certain occurrences of the string with a certain sub-string
`String.repCertain(indexArray:Int32List , substring:String)`
```
console.log(newString.repCertain([3], "r").output) // strparse!strpa$se!
console.log(newString.repCertain([0, 2], "r").output) // st$parse!st$parse!
``` 
####  Replace certain number of occurrences from the start
`String.replaceStr(count : Number, substring: String)`
```
console.log(newString.replaceStr(2 , "r").output) // st$pa$se!strparse!
```
#### Replace all instances 
`String.repAll(substring: String)`
#### Replace the substring on a certain index
`String.indexRep(index : Number , all : Boolean)`
```
console.log(newString.indexRep(2, true).output) // st$pa$se!st$pa$se!
console.log(newString.indexRep(2, false).output) // st$parse!strparse!
```
## Extended Functions 
**...Thinking of functions to add here**