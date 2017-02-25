const textMetrics= require('./textMetrics.js')
const fileData = require('./fileData.js')

//test file 1
fileData.getFileAsString('chapter1.txt')
.then(obj=>{
    console.log(obj); //print chapter1 text
    return textMetrics.createMetrics(obj)
})
.then(obj=>{
    console.log(obj); //print creatMetrics result
    return fileData.saveJSONToFile('./save_chapter_1_result.json',obj)
})
.then((message)=>{
    console.log(message);
    return fileData.getFileAsJSON('./save_chapter_1_result.json');
})
.then(obj =>{
    return fileData.saveStringToFile('./save_chapter_1_result.txt',
            JSON.stringify(obj));
})
.then((message)=>{
    console.log(message);
    console.log("complete test file 1:\n ALL DONE: 1, read from chpater1.txt;\n 2: save createMetrics result to save_chapter_1_result.json; \n 3: read save_chapter_1_result.json and save it again in save_chapter_1_result.txt. \n")
},
reason=>{
    console.log(reason);
})
.catch((err)=>{
    console.log("error happens in manipulating file 1");
}).then(()=>{
    //test file 2
    return fileData.getFileAsString('chapter2.txt')
})
.then(obj=>{
    console.log(obj); //print chapter2 text
    return textMetrics.createMetrics(obj)
})
.then(obj=>{
    console.log(obj);
    return fileData.saveJSONToFile('./save_chapter_2_result.json',obj)
})
.then((message)=>{
    console.log(message);
    return fileData.getFileAsJSON('./save_chapter_2_result.json');
})
.then(obj =>{
    return fileData.saveStringToFile('./save_chapter_2_result.txt',
            JSON.stringify(obj));
})
.then((message)=>{
    console.log(message);
    console.log("complete test file 2:\n ALL DONE: 1, read from chpater2.txt;\n 2: save createMetrics result to save_chapter_2_result.json; \n 3: read save_chapter_2_result.json and save it again in save_chapter_2_result.txt. \n")
},
reason=>{
    console.log(reason);
})
.catch((err)=>{
    console.log("error happens in manipulating file 2");
}).then(()=>{
    //test file 3
    return fileData.getFileAsString('chapter3.txt');
})
.then(obj=>{
    console.log(obj); //print chapter3 text
    return textMetrics.createMetrics(obj)
})
.then(obj=>{
    console.log(obj);
    return fileData.saveJSONToFile('./save_chapter_3_result.json',obj)
})
.then((message)=>{
    console.log(message);
    return fileData.getFileAsJSON('./save_chapter_3_result.json');
})
.then(obj =>{
    return fileData.saveStringToFile('./save_chapter_3_result.txt',
            JSON.stringify(obj));
})
.then((message)=>{
    console.log(message);
    console.log("complete test file 3:\n ALL DONE: 1, read from chpater3.txt; \n 2: save createMetrics result to save_chapter_3_result.json; \n 3: read save_chapter_3_result.json and save it again in save_chapter_3_result.txt. \n")
},
reason=>{
    console.log(reason);
})
.catch((err)=>{
    console.log("error happens in manipulating file 3");
});
