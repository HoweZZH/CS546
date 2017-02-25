const dbConnection=require("./mongoConnection");

//This will allow one to have one reference to each collection per app
let getConnectionFn=(collection)=>{
    let _col = undefined;

    return ()=>{
        if(!_col){

            _col=dbConnection().then(db=>{
                return db.collection(collection);
            });
        }
        return _col;
    }
}

//list collections here:
module.exports={
    todoItems:getConnectionFn("todoItems")
};