const clientform = require('./clientform');
const serverform = require('./serverform');

const constructorMethod = (app) => {
    app.use("/clientform", clientform);
    app.use("/serverform", serverform);

    app.use("*", (req, res) => {
        res.redirect("/clientform");
    })
};

module.exports = constructorMethod;

