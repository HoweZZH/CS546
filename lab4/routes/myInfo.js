const express = require('express');
const router = express.Router();
const data = require("../data");
const myInfoData = data.myInfo;
const file=require("../data/fileData.js")
router.get("/", (req, res) => {
    myInfoData.getMyInfo().then((info)=>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200);
    res.send("<h1>welcome to homepage!</h1><br>"+"<h3><code>"+JSON.stringify(info)+"</code></h3>");
    })
});
router.get("/education/", (req, res) => {
    myInfoData.getMyInfo().then((info)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(info[0].education));
    });
});
router.get("/education/highschool", (req, res) => {
    myInfoData.getMyInfo().then((info)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(info[0].education.highschool));
    })
   
});
router.get("/education/undergrad", (req, res) => {
    myInfoData.getMyInfo().then((info)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(info[0].education.undergrad));
    })
});
router.get("/hobbies/", (req, res) => {
    myInfoData.getMyInfo().then((info)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(info[0].hobbies));
    })
});
router.get("/hobbies/:hobby", (req, res) => {
    myInfoData.getMyInfo().then((info)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    console.log(info[0].hobbies[req.params.hobby]);
    res.send(JSON.stringify(info[0].hobbies[req.params.hobby]));
    })
});
router.get("/classes/", (req, res) => {
    myInfoData.getMyInfo().then((info)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(info[0].classes));
    })
});
router.get("/classes/details", (req, res) => {
    myInfoData.getMyInfo().then((info)=>{
        let query= req.query;
    if(!info[0].classes[query.code]) res.status(404).send({err:"404 NOT FOUND"});
    else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(info[0].classes[query.code]));
    }
    },(err)=>{
        res.status(500).send({err:"500 Internal Error"});
    });
});
router.post("/",(req,res)=>{
    res.status(500).send({err:"500 Internal Error"});
})

module.exports = router;