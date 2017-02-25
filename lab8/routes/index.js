const testRoutes = require("./test");

const constructorMethod = (app) => {
    app.use("/", testRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;