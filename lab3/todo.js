const mongoCollections = require("./mongoCollections");
var uuid = require('node-uuid');
const todoItems = mongoCollections.todoItems;

module.exports = 
{   
    createTask(title, description) {
        if (!title || typeof description !== 'string') 
            return Promise.reject("You need to provide a string of title");
        
        if (!description|| typeof description !== 'string') 
            return Promise.reject("You need to provide a string of description");
        
        return todoItems().then((todoitemscollection) => {
            let newTask = {
                _id:uuid.v4(),
                title: title,
                description: description,
                completed:false,
                completedAt:null
            };

            return todoitemscollection
                .insertOne(newTask)
                .then((newObj) => {
                    return newObj.insertedId;
                })
                .then((newId) => {
                    return this.getTask(newId);
                });
        });
    },
    getAllTasks(){
        return todoItems().then((todoitemscollection)=>{
            return todoitemscollection.find({}).toArray();
        },(err)=>{
            Promise.reject(err);
        });
    },
    getTask(id)
    {
        if (!id) 
        return Promise.reject("You need to provide an id to search for");
        return todoItems().then((todoitemscollection)=>{
            return todoitemscollection.findOne({_id: id});
        });
    },
    
    completeTask(id)
    {
        if (!id) 
            return Promise.reject("You need to provide an id to search for(completeTask)");
            
        return todoItems().then((todoitemscollection) => {
            let updateitem = {
                completed: true,
                completedAt: new Date()
            };
            return todoitemscollection.updateOne({
                _id: id 
            }, {$set:updateitem}).then(() => {
                
                return this.getTask(id);
            });
        }); 
    },
    removeTask(id)
    {
        if (!id) 
            return Promise.reject("You need to provide an id to search for");
        
        return todoItems().then((todoitemscollection) => {
            return todoitemscollection
                .removeOne({_id: id})
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        return Promise.reject(`Could not delete task with id of ${id}`)
                    }
                    //return this.getTask(id);
                });
        });
    },
    removeAll()
    {
        return todoItems().then((todoitemscollection) => {
            todoitemscollection.remove();
        });
    }
};