const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require('node-uuid');

let exportedMethods = {
    //get all recipes with in the format of { _id: recipeId, title:Recipe_title}.
    getAllRecipes() {
        return recipes().then((recipeCollection) => {
            return recipeCollection.find({},{ _id: 1, title: 1 }).toArray();
        });
    },
    //return detail of a recipe
    getRecipeById(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({ _id: id }).then((recipe)=>{
                if(!recipe) return Promise.reject("Could not find recipe with id of " + id);
                return recipe;
            });
        });
    },
    //create recipe with supplied data in request body
    addRecipe(title,ingredients,steps,comments) {
        return recipes().then((recipeCollection) => {
            let newRecipe = {
                _id: uuid.v4(),
                title: title,
                ingredients:ingredients,
                steps:steps,
                comments:comments
            };
            return recipeCollection.insertOne(newRecipe).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getRecipeById(newId);
            });
        });
    },
    //Updates the specified recipe with only the supplied changes, and returns the updated recipe
    updateRecipe(id, newRecipe) {
        return recipes().then((recipeCollection)=>{
            let updatedRecipe = {};
            if(newRecipe.title) updatedRecipe['title']=newRecipe.title;
            if(newRecipe.ingredients) updatedRecipe['ingredients']=newRecipe.ingredients;
            if(newRecipe.steps) updatedRecipe['steps']=newRecipe.steps;
            if(newRecipe.comments) updatedRecipe['comments']=newRecipe.comments;
            return recipeCollection.updateOne({ _id: id }, {$set: updatedRecipe}).then(() => {
                return this.getRecipeById(id);
            }); 
        });
    },
    //Deletes the recipe
    removeRecipe(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    return Promise.reject(`Could not delete user with id of ${id}`);
                }
            });   
        });
    }
}

module.exports = exportedMethods;