const recipeRoutes = require("./recipes");
const commentRoutes = require("./comments");
var runSetup = require("../tasks/seed.js");

let constructorMethod = (app) => {
    app.use("/recipes", recipeRoutes);
    app.use("/comments", commentRoutes);
};

(runSetup()).then((allRecipes)=>{
    console.log("After the setup has been complete, we have the following recipes:");
    console.log(allRecipes);
});

module.exports = {
    recipes: require("./recipes"),
    comments: require("./comments")
};


