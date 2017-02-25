//Zhao_Zihao_CS546_WS_Lab3
const todo = require('./todo.js')
const connection = require("./mongoConnection");

let task_obj_1={
    title: "Ponder Dinosaurs",
    description: "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?"
};
let task_obj_2={
    title: "Play Pokemon with Twitch TV",
    description: "Should we revive Helix?"
}

todo.removeAll() // clear the working collection first
.then(()=>{
//1. Create a task(1)
    return todo.createTask(task_obj_1.title,task_obj_1.description)
})
//2. Log the task
.then((obj)=>{
    console.log("@createTask 1 and log it: \n",obj);
})
//and then create a new task(2)
.then(()=>{
    return todo.createTask(task_obj_2.title, task_obj_2.description) 
})
.then((obj)=>{
    console.log('@createTask 2 and log it: \n', obj);
    return todo.getAllTasks();
})
.then((obj)=>{
    console.log('@Query all tasks and log them: \n', obj);
    return obj;
})
 //remove the first task
.then((obj)=>{
    return todo.removeTask(obj[0]._id);
})
//query all task
.then(()=>{
    return todo.getAllTasks();
})
//log remaining task
.then((objArra)=>{
    console.log("@Delted the first task, log all remaining task: \n", objArra)
    return objArra;
})
//complete the remaining task
.then((objArra)=>{
    var promises = [];
    for (var i in objArra) {
        //console.log("index",i);
        promises.push(todo.completeTask(objArra[i]._id).then()); // push the Promises to our array
    }  
    return Promise.all(promises);
}) 
//query and log the remaining task
.then((objArra)=>{
    for(let i=0;i<objArra.length;i++){
        todo.getTask(objArra[i]._id).then((obj)=>{
            console.log("@After Completion, Query and log the remaining task.\n", obj);
        })
    }
})
.catch((err)=>{
    console.log(err);
})
.then(() => {
    return connection();
})
.then((db) => {
    return db.close();
});

