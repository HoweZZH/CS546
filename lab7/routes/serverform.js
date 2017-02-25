const express = require('express');
const router = express.Router();
const data = require("../data");
const processString = data.processString;

router.get("/", (req, res) => {
    res.render("form/server", {});
});

router.post("/", (req, res) => {
    console.log("serverForm POST");
    let inputText = req.body.inputText;
    let insertString = req.body.insertString;
    let times = parseInt(req.body.times);
    let spacing = parseInt(req.body.spacing);
    let result="";
    let insertStr =processString.insertStr;
    try{
        result=insertStr(stringToBeinserted=inputText, insertString=insertString,spacing=spacing,times=times)
    } catch (e) {
        console.log(e)
        res.render("form/server", {inputText:inputText,
    								insertString:insertString,
    								spacing:spacing,
    								times:times,
                                    error: e 
								    });
        return;
    }
    res.render("form/server", {inputText:inputText,
                                insertString:insertString,
                                spacing:spacing,
                                times:times,
                                result:result
                                });
});

module.exports = router;