# CS 546 

2016 fall CS 546 Web Programming

HTML, CSS, Javascript(frontend) + NodeJS(backend)
## CS-546 Lab 1

### An Intro to Node 
For this lab, you will be creating several functions and run them in a simple script!

You will submit a single file named `lab1.js`. In this lab, you will write the 5 functions below, and run them with test input.

### sumOfSquares(num1, num2, num3)
For your first function, you will calculate the sum of the squares of 3 numbers and return that result. That means `sumOfSquares(5, 3, 10)`
 would return `134`.

### sayHelloTo(firstName, lastName, title);
For the second function, you will make a simple function that uses `console.log` to print hello to someone!

The interesting thing about this function is that you don't have to have *all* the inputs to run.

Your function should print a string in the following format:
```
sayHelloTo(); // throws 
sayHelloTo("Phil"); // logs: Hello, Phil! 
sayHelloTo("Phil", "Barresi"); //logs: Hello, Phil Barresi. I hope you are having a good day!
sayHelloTo("Phil", "Barresi", "Mr."); // logs: Hello, Mr. Phil Barresi! Have a good evening!
```
### cupsOfCoffee(howManyCups)
For the third function, you will create and return a simple song called `99 Cups of Coffee on the Desk`.

The lyrics of this song grow longer depending on how many cups of coffee there are on the desk.

If you run `cupsOfCoffee(5)` it would return:
```
5 cups of coffee on the desk! 5 cups of coffee!
Pick one up, drink the cup, 4 cups of coffee on the desk!
4 cups of coffee on the desk! 4 cups of coffee! 
Pick one up, drink the cup, 3 cups of coffee on the desk!
3 cups of coffee on the desk! 3 cups of coffee! 
Pick one up, drink the cup, 2 cups of coffee on the desk!
2 cups of coffee on the desk! 2 cups of coffee! 
Pick one up, drink the cup, 1 cup of coffee on the desk!
1 cup of coffee on the desk! 1 cup of coffee! 
Pick it up, drink the cup, no more coffee left on the desk!
```
Take note for the subtle grammar changes!

### occurrencesOfSubstring(fullString, substring)
For the fourth function, you will calculate how many times a substring occurs in a given string.

For example, calling `countOccurrencesOfSubstring("hello world", "o");` should return `2`, because the letter *o* appears two times in the string.

However, you must also factor in a case where there are overlaps! 
When you call `countOccurrencesOfSubstring("Helllllllo, class!", "ll");` it should return `6`.

### randomizeSentences(paragraph)
For your final function, you will take in a paragraph and randomize the sentences in it.
```
var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
console.log(randomizeSentences(paragraph));
```

Would print something *like*:
```
You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. I am a paragraph. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations. Hello, world!
```
This one is tricky! You'll have to work with string manipulation, and probably an array or two as well.

### Error Checking
Expect and account for bad input, and handle it accordingly! You can `throw "A string describing an error"`
 when given bad input. You can read about throwing [on the MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)

1. You should throw if data is not of an expected type: ie, expecting a number and receiving an integer.

2. You should throw if your data is an out of bounds situation; ie: receiving a negative side length for certain values, or data that does not make sense given the requirements of the function.

### Requirements
1. You will have to write each function
2. You must check that all arguments are valid and of the proper type

## CS-546 Lab 2
### Asynchronous Code, Files, and Promises
This week will be interesting -- we're going to be working with files; particularly, reading them, creating metrics on them, and storing them using promises.

You'll need to write two modules this week.

### Your file module, fileData.js
This module will export four methods:

#### getFileAsString(path)

This method will, when given a path, return a promise that resolves to a string with the contents of the files.

If no path is provided, it will return a rejected promise.

If there are any errors reading the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.

#### getFileAsJSON(path)

This method will, when given a path, return a promise that resolves to a JavaScript object. You can use the `JSON.parse` function to convert a string to a JavaScript object (if it's valid!).

If no path is provided, it will return a rejected promise.

If there are any errors reading the file or parsing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.

**Hint:** this function can be accomplished in approximately 3-4 lines. Don't overcomplicate it!

#### saveStringToFile(path, text)

This method will take the `text` supplied, and store it in the file specified by `path`. The function should return a promise that will resolve to `true` when saving is completed.

If no path or text is provided, it will return a rejected promise.

If there are any errors writing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.

#### saveJSONToFile(path, obj)

This method will take the `obj` supplied and convert it into a string so that it may stored as in a file. The function should return a promise that will resolve to `true` when saving is completed.

If no path or obj is provided, it will return a rejected promise.

If there are any errors writing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.

## Your metric module, textMetrics.js
This module will export one method, `createMetrics(text)` which will scan through the text **ignoring case** and return an object with the following information:
```
{
    totalLetters: total number of letters in the text,
    totalWords: total number of words in the text,
    uniqueWords: total number of unique words that appear in the text,
    longWords: number of words in the text that are 6 or more letters long,
    averageWordLength: the average number of letters in a word in the text,
    numberOfSentences: total number of sentences in the text,
    textComplexity: totalWords/numberOfSentences + (longWords x 100)/totalWords
    wordOccurrences: {
        word1: number of times that word appears in the text,
        word2: number of times that word appears in the text,
        etc... 
    }
}
```
So running:
```
createMetrics("Hello, my friends! This is a great day to say hello.")
```
Will return:
```
    totalLetters: 39,
    totalWords: 11,
    uniqueWords: 10,
    longWords: 1,
    averageWordLength: 3.55,
    textComplexity: 14.59
    wordOccurrences: {
        hello: 2,
        my: 1,
        friends: 1,
        this: 1,
        is: 1,
        a: 1,
        great: 1,
        day: 1,
        to: 1,
        say: 1
    }
}   
```
### Important note:
You will ignore any character that is punctuation. Ignore all spaces. Ignore all commas. Ignore all question marks, exclamation marks, periods, single quotes, double quotes, etc. You will only care about letters and spaces.

### app.js
Write a file, app.js, which will print out the results from the following test files:

chapter1
chapter2
chapter3

### Requirements
1. You must not submit your node_modules folder
2. You must remember to save your dependencies to your package.json folder
3. You must do basic error checking in each function
1. Check for arguments existing and of proper type.
2. Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does not exist)
3. If a function should return a promise, instead of throwing you should return a rejected promise.
