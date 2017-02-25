const recipesRoutes = require("./recipes");
const commentsRoutes = require("./comments");

const constructorMethod = (app) => {
    app.use("/recipes/", recipesRoutes);
    app.use("/comments/", commentsRoutes);
    app.use("/$/",(req,res)=>{
        res.status(200).send("root page");
    });
    app.use("*", (req, res) => {
        res.status(404).send("404 NOT found, no support for this operation");
    })
};

module.exports = constructorMethod;






