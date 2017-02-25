const myInfoRouters = require("./myInfo");

const constructorMethod = (app) => {
    app.use("/", myInfoRouters);
    app.use("*", (req, res) => {
        res.status(404).json({error:"404 Not found"});
    });
};

module.exports = constructorMethod;