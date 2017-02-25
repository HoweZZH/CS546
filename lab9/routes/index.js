const api = require("./api");

const constructorMethod = (app) => {
    app.use("/", api);
    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;

