const fs = require('fs')

var fileData=module.exports={
    //This method will, when given a path, return a promise that resolves to a string with the contents of the files.
    //file => str
    getFileAsString: function(path){
        return new Promise(function(resolve,reject){
            if(!path) reject("reject! error happend in getFileAsString method!");
            fs.readFile(path,"utf-8", (err, str) => {
            if (err)  reject(err);
                resolve(str);
            });
        });
    }, 
    //This method will, when given a path, return a promise that resolves to a JavaScript object. 
    //file => obj
    getFileAsJSON: function(path){
        return new Promise(function(resolve,reject){
            if(!path) reject("reject! error happend in getFileAsJSON method in path!");
            fs.readFile(path,"utf-8", (err, str) => {
            if (err) reject(err);
            try{
                var obj=JSON.parse(str); //Converts a JavaScript Object Notation (JSON) string into an object.
           }catch(err){
                console.log("reject! error happend in getFileAsJSON")
                console.log(err);
                reject(err);
            }
                resolve(obj);
            });
        });
    }
}


