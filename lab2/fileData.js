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
            if(!path) reject("reject! error happend in getFileAsJSON method!");
            fs.readFile(path,"utf-8", (err, str) => {
            if (err) reject(err);
            try{
                obj=JSON.parse(str); //Converts a JavaScript Object Notation (JSON) string into an object.
            }catch(err){
                reject(err);
            }
                resolve(obj);
            });
        });
    },
    //This method will take the text supplied, and store it in the file specified by path. 
    // str => file
    saveStringToFile: function(path, text){
        return new Promise(function(resolve,reject){
            if(!path||!text) reject("reject! error happend in saveStringToFile method!");
            fs.writeFile(path,text,function(err,str){
                if(err) reject(err);
                resolve("text have been saved to "+path);
            });
        })
    },
    //This method will take the obj supplied and convert it into a string so that it may stored as in a file.
    // obj => file
    saveJSONToFile: function(path, obj){
        return new Promise(function(resolve,reject){
            if(!path||!obj) reject("reject! error happend in saveJSONToFile method!");
            fs.writeFile(path,JSON.stringify(obj, null, 4),function(err,str){
                if(err) reject(err);
                resolve("text have been saved to "+path);
            });
        })
    }
}


