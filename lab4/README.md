
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

