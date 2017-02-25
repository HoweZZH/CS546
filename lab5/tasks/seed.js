const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require('node-uuid');

var runSetup = function() {
    return dbConnection().then(db => {
        return db.dropDatabase().then(() => {
            return dbConnection;
        }).then((db) => {
            return recipes().then((recipeCollection) => {
                var makeRecipe = function(title) {
                    return {
                        _id: uuid.v4(),
                        title: title,
                        ingredients: [],
                        steps: [],
                        comments: []
                    }
                };
                var addIngredient = function(recipe, name, amount) {
                    var newIngredient = {
                        name: name,
                        amount: amount
                    };
                    recipe.ingredients.push(newIngredient);
                };
                var addIngredient = function(recipe, name, amount) {
                    var newIngredient = {
                        name: name,
                        amount: amount
                    };
                    recipe.ingredients.push(newIngredient);
                };
                var addComment = function(recipe, name, poster, comment){
                    var newComment = {
                        _id: uuid.v4(),
                        name:name,
                        poster: poster,
                        comment: comment
                    }
                    recipe.comments.push(newComment);
                };
                var listOfRecipes = [];

                var FriedEggs = makeRecipe("Fried Eggs");
                FriedEggs.steps.push("First, heat a non-stick","Second step", "Third steps");
                addIngredient(FriedEggs, "Egg","2 eggs");
                addIngredient(FriedEggs, "ingredient 2","something");
                addComment(FriedEggs, name="Perfect", poster="John",comment= "Couldn't be better.");
                addComment(FriedEggs, name="not bad", poster="Mike",comment="bot bad for this price");

                var FriedChicken = makeRecipe("Fried Chicken");
                FriedChicken.steps.push("First step","Second step", "Third steps");
                addIngredient(FriedChicken, "chicken ","2 chicken");
                addComment(FriedChicken, name="not bad", poster="Howe", comment="God gives every bird its food, but he does not throw it into its nest.");
                addComment(FriedChicken, name="great", poster="zill",comment="perfect chicken !");

                listOfRecipes.push(FriedEggs,FriedChicken);
                
                // we can use insertMany to insert an array of documents!
                return recipeCollection.insertMany(listOfRecipes).then(function() {
                    return recipeCollection.find().toArray();
                });
            });
        });
    }, (error) => {
        return error;
    });
};
// By exporting a function, we can run 
var exports = module.exports = runSetup;

