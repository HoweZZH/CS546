# CS 546 

2016 fall CS 546 Web Programming

template engine: handlebars
server router: NodeJS express package
database API: nodejs mongodb driver api

update lab requirements, hard work, cheers~
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

## CS-546 Lab 3
### Our First ToDo
For this lab, we're going to embark on a very common path that web developers start off on new technologies with: creating a to-do list! You will create a to-do list data module for this lab lab, and test it yourself.

The major concepts of this lab are:

1. Seperating concerns into different modules:
* Database connection in one module
* Collections defined in another
* Data manipulation in another

2. Further practicing the usage of promises for asynchronous code
3. Continuing our exercises of only linking these modules together as needed

### Packages you will use:
You will use the **node-uuid** package in order to generate unique id's to use as your identifiers.

You can read up on node-uuid to an external site. on the Github project page.

You will also use the mongodb Links to an external site. package.

You may use the lecture 4 code Links to an external site. as a guide.

**You must save all dependencies to your package.json file**

### Database Structure
You will use a database with the following organization:

* The database will be called **lab3**
* The collection for todo items will be called **todoItems**

### todo.js
In todo.js, you will create and export four methods:

#### createTask(title, description);

This function will return a promise that resolves to a newly created to-do list object, with the following properties:
```
{
    _id: "a unique identifier for the task; you will generate these using node-uuid",
    title: "the title of the task",
    description: "a descriptive bio of the task",
    completed: false,
    completedAt: null
}   
```

This task will be stored in the **todoItems** collection.

Important Note: **you will create and set the `_id` field in the `createTask` method.**

Important Note: as you can tell, the parameters only provide a title and description. You must still set the other fields before inserting them into the database.

If the task cannot be created, the method should reject.

You would use it as:
```
const todoItems = require("./todo");

let createdTask = todoItems.createTask("My First Task", "This is the first thing I need to do today");

createdTask.then((newTask) => {
    console.log(newTask);
});
```

#### getAllTasks();

This function will return a promise that resolves to an array of all tasks in the database.

#### getTask(id);

This function will return a promise that resolves to a task from the database, when given an id. For example, you would use this method as:

If no id is provided, the method should return a rejected promise.

If the task does not exist, the method should return a rejected promise.
```
const todoItems = require("./todo");

let taskPromise = todoItems.getTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");

taskPromise.then((task) => {
    console.log(task);
})
```

#### completeTask(taskId)

This function will modify the task in the database. It will set `completed` to `true` and `completedAt` to the current time.

If no id is provided, the method should return a rejected promise.

If the task cannot be updated (does not exist, etc), the method should reject.
```
const todoItems = require("./todo");

let taskPromise = todoItems.getTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");

let finishedTask = taskPromise.then((task) => {    
    return todoItems.completeTask(task._id);    
});

finishedTask.then((task) => {
    console.log(task);
});
```

Important note: for now, in `completeTask` you will want to get the task from the database, update the task in your JS code, and then run the update command.

If you would like to do something more advanced, you may also research using the `$set` Links to an external site. command to accomplish this as well.

#### removeTask(id)

This function will remove the task from the database.

If no id is provided, the method should return a rejected promise.

If the task cannot be removed (does not exist), the method should reject.
```
const todoItems = require("./todo");

let removeTask = todoItems.removeTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");

let tryToGetTask = removeTask.then(() => {
    return todoItems.getTask("9714a17c-f228-49e9-a772-9086f5ff8bfb");
});

tryToGetTask.catch((error) => {
    // Should error out
    console.error(error);
})
```

### app.js
For your app.js file, you will:

#### 1. Create a task with the following details:

{
    title: "Ponder Dinosaurs",
    description: "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?"
}
#### 2. Log the task, and then create a new task with the following details:

{
    title: "Play Pokemon with Twitch TV",
    description: "Should we revive Helix?"
}
#### 3. After the task is inserted, query all tasks and log them

#### 4. After all the tasks are logged, remove the first task

#### 5. Query all tasks and log them

#### 6. Complete the remaining task

#### 7. Query and log the remaining task.

### Requirements
1. You **must not submit** your node_modules folder
2. You **must remember** to save your dependencies to your package.json folder
3. You must do basic error checking in each function
* Check for arguments existing and of proper type.
* Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does not exist)
* If a function should return a promise, instead of throwing you should return a rejected promise.

4. You must remember to update your package.json file to set `app.js` as your starting script!
5. You must submit a zip, rar, tar.gz, or .7z archive or you will lose points, named in the followign format: `LastName_FirstName_CS546_SECTION.zip` (or, whatever the file extension may be). You will lose points for not submitting an archive.


## CS-546 Lab 4
### About Me API
For this lab, you will create a simple server that implements several routes and follows the patterns and organization from the lecture_5 application.

You will be creating several routes that give information about yourself.

### Packages you will use:
You will use the **express** package as your server.

You can read up on `express` on its home page. Specifically, you may find the `API Guide section on requests` useful.

You may use the `lecture 5 code` as a guide.

**You must save all dependencies to your package.json file**

### Your response
All valid responses should return a 200 status code and JSON in the format of:
```
{
  information: "The requested info"
}
```
The information provided depends on the route

All invalid responses should return a 404 status code if they were trying to access nonexistant resources, or a 500 status code if an internal error occurred.

### Your Routes
| path                                | description                                                                                                  |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------|
| /education                          | Returns a list of all the schools you attended                                                               |
| /education/highschool               | Returns the name of the high school you went to                                                              |
| /education/undergrad                | Returns the name of the undegrad school you went to, and the degree you received (or will receive)           |
| /hobbies                            | Returns a list of your hobbies; only returns their names                                                     |
| /hobbies/:hobby                     | Returns additional information about the hobby provided in the hobbyparam.                                   |
| /classes                            | Returns a list of the course codes for 5+ classes you have taken                                             |
| /classes/details?code={course code} | Using a querystring parameter for the course code, show details on that course (name, professor, description |

### Requirements
1. You must not submit your node_modules folder
2. You must remember to save your dependencies to your package.json folder
3. You must do basic error checking in each function
* Check for arguments existing and of proper type.
* Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does not exist)
* If a function should return a promise, instead of throwing you should return a rejected promise.
4. You must remember to update your package.json file to set `app.js` as your starting script!


## CS-546 Lab 5
### A Recipe API
For this lab, you will create a simple server that provides an API for someone to Create, Read, Update, and Delete recipes. These recipes will be stored in a database named **lab5-recipes**.

This recipe database will also provide support for creating, reading, updating, and deleting comments for a recipe.

### The recipe object
```
{ 
  _id: "A uuid",
  title: "Recipe title",
  ingredients: [
    {
      name: "Ingredient name",
      amount: "portion amount"
    }
  ],
  steps: [
    "First step",
    "Second step",
    "Third step"
  ],
  comments: []
}
```
For example, a fried egg recipe:
```
{ 
  _id: "bd8fa389-3a7a-4478-8845-e36a02de1b7b",
  title: "Fried Eggs",
  ingredients: [
    {
      name: "Egg",
      amount: "2 eggs"
    },
    {
      name: "Olive Oil",
      amount: "2 tbsp"
    },
  ],
  steps: [
    "First, heat a non-stick pan on medium-high until hot",
    "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
    "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
    "Gently pour the egg from the bowl onto the oil",    
    "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
    "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
    "Remove from oil and plate",
    "Repeat for second egg"
  ],
  comments: []
}
```

### Comments
Your comment will be stored on the recipe page.
```
{
  _id: "A uuid",
  poster: "poster name",
  comment: "the comment"
}
```
For example:
```
{
  _id: "9b527da1-67c0-4c13-ae99-3c1288ff2975",
  poster: "Gordan Ramsay",
  comment: "These eggs are delicious!" 
}
```
### Packages you will use:
You will use the **express** package as your server.

You can read up on `express` Links to an external site. on its home page. Specifically, you may find the API Guide section on requests useful.

You will use the **node-uuid** package in order to generate unique id's to use as your identifiers.

You can read up on `node-uuid` on the Github project page.

You will also use the `mongodb` package.

You may use the `lecture 4 code` as a guide.

You may use the `lecture 5 code` as a guide.

You may use the `lecture 6 code` as a guide.

**You must save all dependencies to your package.json file**

### Your Routes
| verb   | path                           | description                                                                                                                                                                                |
|--------|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /recipes                       | Responds with a list of all recipes in the format of `{_id: RECIPE_ID, title: RECIPE_TITLE}`                                                                                               |
| GET    | /recipes/:id                   | Responds with the full content of the specified recipe                                                                                                                                     |
| POST   | /recipes                       | Creates a recipe with the supplied data in the request body, and returns the new recipe                                                                                                    |
| PUT    | /recipes/:id                   | Updates the specified recipe with only the supplied changes, and returns the updated recipe                                                                                                |
| DELETE | /recipes/:id                   | Deletes the recipe                                                                                                                                                                         |
| GET    | /comments/recipe/:recipeId     | Returns a list of all comments in the specified recipe, in the format of: `{_id: COMMENT_ID, recipeId: RECIPE_ID, reciipeTitle: RECIPE_TITLE, name: COMMENT_NAME, poster: COMMENT_POSTER}` |
| GET    | /comments/:commentId           | Returns the comment specified by that commentId in the format of `{_id: COMMENT_ID, recipeId: RECIPE_ID, reciipeTitle: RECIPE_TITLE, name: COMMENT_NAME, poster: COMMENT_POSTER}`          |
| POST   | /comments/:recipeId/           | Creates a new comment with the supplied data in the request body for the stated recipe, and returns the new comment                                                                        |
| PUT    | /comments/:recipeId/:commentId | Updates the specified comment for the stated recipe with only the supplied changes, and returns the updated comment                                                                        |
| DELETE | /comments/:id                  | Deletes the comment specifiedAny issues should result in a properly failed status code and a description of the error in JSON.                                                             |

### Requirements
1. You must not submit your node_modules folder
2. You must remember to save your dependencies to your package.json folder
3. You must do basic error checking in each function
* Check for arguments existing and of proper type.
* Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does not exist)
* If a function should return a promise, instead of throwing you should return a rejected promise.
4. You must remember to update your package.json file to set `app.js` as your starting script!
5. You must submit a zip, rar, tar.gz, or .7z archive or you will lose points, named in the followign format: `LastName_FirstName_CS546_SECTION.zip` (or, whatever the file extension may be). You will lose points for not submitting an archive.
Previous Next


## CS-546 Lab 6
### HTML and Templating
For this lab, you will be templating some basic data. You will download the `lab_6.zip` zip file that will be provided via Canvas to use that codebase.

There are several things that I want for you to notice about the repository:

* The files in your data module do not access database calls, but still return promises; despite being a simple read-only application, I want you to understand what the workflow will be once you begin fitting databases back into the equation
* The middlewares to setup static assets, as well as the view engine have been setup for you.
* I have provided a handy helper that is not part of handlebars by default: asJSON which will print out the template variables as a JSON string

### Objectives
1. Each route in the routes folder is setup to simply pass nonsense data to a debug view that will print out the data for easy debugging purposes. You will first acquire the associated data needed (detailed in the comments for each route) using the provided data modules. You will then make a view for each route and change the route from passing data to the debug view to the new view; the files can be named as per your choosing, but I personally recommend a directory for each route and some standardized convention (ie, index for when you are listing all objects of a certain data type).
* **Your route will specify what specifically must be included for that page**
* You can lay the content out using any tags that make semantical sense.
* You must print out all properties of the model that are passed down to the template, in some way. You can add any amount of text or other content to the page, as well.

2. You will create a static 404 error page; any url that is not matched by another route will show this 404 page and issue a 404 status code. You can setup this behavior easily in your `routes/index.js` file, which provides a small hint hint.

3. You will add 10+ CSS rules to the `public/styles/main.css` file that will style the HTML you have created using a combination of classes and element selectors (you can use more than that, but must at least use several class / element selectors).

**You must save all dependencies to your package.json file**

### References and Packages
Basic CSS info can easily be referenced in the `MDN CSS tutorial` If you need a quick CSS referfence,

You will use the `express-handlebars` package as your templating engine.

You can reference the `express-handlebars repository` for details on adding the module; you may also want to check out the `handlebars website` for details.

You will use the **express** package as your server.

You can read up on `express` on its home page. Specifically, you may find the `API Guide section on requests` useful.

You may use the lecture 4 code as a guide.

You may use the lecture 5 code as a guide.

You may use the lecture 6 code as a guide.

You may use the lecture 8 code as a guide.

### Requirements
1. You must not submit your node_modules folder
2. You must remember to save your dependencies to your package.json folder
3. You must do basic error checking in each function
* Check for arguments existing and of proper type.
* Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does not exist)
* If a function should return a promise, instead of throwing you should return a rejected promise.
4. You must remember to update your package.json file to set `app.js` as your starting script!
5. Your HTML must be valid or you will lose points on the assignment.
6. Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as i, b, font, center, etc) will result in points being deducted; think in terms of content first, then style with your CSS.
7. **You can be as creative as you'd like to fulfill front-end requirements;** if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.
8. **You cannot update the data modules at all.**



