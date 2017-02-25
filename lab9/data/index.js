const io = require('./io')
let currId = 0;
let todoListEntries = {};
io.read().then(obj => {
    todoListEntries = obj;
    currId = todoListEntries.notes.length;
    // console.log(todoListEntries);
})

// {notes: [{},{},{}]}

// Note title
// Note due date
// Note summary, which can be formatted with HTML.
// Note body, which can be formatted with HTML.

let compareFunc = (l, r) => {
    return l.due_date > r.due_date;
}

let getNumOfTasks = function() {
    return currId;
}

let makeToDo = function(title, due, summary, body) {
    let newTask = {
        id: ++currId,
        title: title,
        done: false,
        due_date: due,
        summary: summary,
        body: body
    };
    todoListEntries.notes.push(newTask);
    todoListEntries.notes.sort(compareFunc);
    // // console.log(todoListEntries);
    for (let i = 1; i <= currId; i++) {
        todoListEntries.notes[i - 1].id = i;
    }

    io.store(todoListEntries)
    .then(res => {
        // console.log(res); 
    })

    return newTask;
};

let getToDo = function(id) {
    // console.log(`getting note with id: ${id}`);
    if (!id) throw "Id must be proviede!"
    if (!todoListEntries.notes[id - 1]) throw "No such entry exists";
    return todoListEntries.notes[id - 1];
};

// let finishToDo = function(id) {
//     let entry = getToDo(id);
//     entry.done = true;

//     return entry;
// };

// let updateToDo = function(id, newTitle, newTask, newDue, newSummary, newBody) {
//     let entry = getToDo(id);
//     if (newTitle) entry.title = newTitle;
//     if (newTask) entry.task = newTask;
//     if (newSummary) entry.summary = newSummary;
//     if (newDue) entry.due_date = due;
//     if (newBody) entry.body = newBody;

//     return entry;
// };

let getAll = function() {
    return todoListEntries.notes;
};

// let getFinished = function() {
//     return getAll().filter(function(entry) {
//         return entry.done;
//     });
// };

// let getUnfinished = function() {
//     return getAll().filter(function(entry) {
//         return !entry.done;
//     });
// };

module.exports = {
    getNumOfTasks: getNumOfTasks,
    getToDo: getToDo,
    // finishToDo: finishToDo,
    // updateToDo: updateToDo,
    getAll: getAll,
    // getFinished: getFinished,
    // getUnfinished: getUnfinished,
    makeToDo: makeToDo
};

// module.exports.makeToDo("Example Task", '2012-12-21', "This is the summary", "This is the body");
// module.exports.makeToDo("Example Task 2", '2012-12-22', "This is the summary 2", "This is the body 2");









