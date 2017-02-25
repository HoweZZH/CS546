const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require('node-uuid');

let exportedMethods = {
    //Returns a list of all comments in the specified recipe 
    getCommentsByRecipeId(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({_id:id}).then((recipe)=>{
                console.log(recipe);
                if(!recipe) return Promise.reject("no recipe match.")
                comments=recipe.comments;
                for(let i=0;i<comments.length;i++){
                    comments[i]['recipeId']=recipe._id;
                    comments[i]['recipeTitle']=recipe.title;
                    //if no name in comment, comment content will be supplied as comment_name
                    if(comments.name){
                        comments[i]['name'] = comments.name;
                    }
                    else{
                        comments[i]['name'] = comments[i].comment;
                    }
                }
                return comments;
            });
        });
    }, 
    //Returns the comment specified by that commentId. 
    getCommentById(commentId) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({ "comments._id": commentId }).then((recipe)=>{
                console.log(recipe);
                if(!recipe) return Promise.reject("no comment match.")
                let comments=recipe.comments;
                let cmt={
                    "recipeId":recipe._id,
                    "recipeTitle":recipe.title,
                };
                for (let i = 0; i < comments.length; i++) {
                    if(comments[i]._id===commentId.toString()){
                        console.log(comments[i]._id);
                        cmt["_id"]=comments[i]._id;
                        if(comments[i].name){
                            cmt["name"]=comments[i].name;
                        }else{
                            cmt["name"]=comments[i].comment;
                        }
                        cmt["poster"]=comments[i].poster;
                        return cmt;
                    }
                }
            });
        });
    },       
    //Creates a new comment with the supplied data, and returns the new comment.     
    addOneComment(recipeId,newComment) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({ _id: recipeId }).then((recipe) => {
                if (!recipe) return Promise.reject({ error: "No recipe match" });
                let addComment={
                    _id:uuid.v4(),
                };
                
                if(newComment.poster) addComment['poster']=newComment.poster;
                if(newComment.name) addComment['name']=newComment.name;
                if(newComment.comment) addComment['comment']=newComment.comment;
                let cmt={
                    $push: { comments: addComment } 
                };
                //console.log(addComment);
                return recipeCollection.update({_id: recipeId},cmt)
                .then(()=>{
                    return addComment;
                });
            });
        });
    },
    //Updates the specified comment for the stated recipe with only the supplied changes, and returns the updated comment
    updateComment(recipeId,commentId, updatedComment) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({ _id: recipeId })
                .then((recipe) => {
                    if (updatedComment.name) {
                        recipeCollection.update({'comments._id': commentId}, { $set:  { 'comments.$.name': updatedComment.name}});
                    }
                    if (updatedComment.comment) {
                        recipeCollection.update({'comments._id': commentId}, { $set:  { 'comments.$.comment': updatedComment.comment}});
                    }
                    if (updatedComment.poster) {
                        recipeCollection.update({'comments._id': commentId}, { $set:  { 'comments.$.poster': updatedComment.poster}});
                    }
                   
                    return exportedMethods.getCommentById(commentId);
                });
        });
    },
    //Deletes the comment specified
    removeComment(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.update({ 'comments._id': id },{ $pull: {'comments': { _id: id} } }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    Promise.reject({error: `Could not delete post with id of ${id}`});
                }else{
                    return "Ok";
                }
            });
        });
    }
}

module.exports = exportedMethods;