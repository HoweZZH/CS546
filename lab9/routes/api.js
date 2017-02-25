const express = require('express');
const router = express.Router();
const xss = require('xss');
const todoData = require('../data')

router.get("/new", (req, res) => {
        console.log("get new");
	    res.render("new", {});
})

router.get("/:note", (request, response) => {
	console.log("note id");
	response.render("note", {
		note: todoData.getToDo(request.params.note) //get data by note id
	});
})

router.post("/nextNote", (req, res) => {
	let body = req.body;
	let id;
	try {
		if (parseInt(req.body.id) >= todoData.getNumOfTasks()) {
			id = 1;
		} else {
			id = parseInt(req.body.id) + 1;
		}
	} catch (err) {
		console.log(err);
		res.status(404).json("404 not found");
	}
	let note = todoData.getToDo(id);
	res.status(200).json(note);
})

router.post("/new", function(request, response) {
	let body = request.body;
	let newNote = todoData.makeToDo(xss(body.title), xss(body.due), xss(body.summary), xss(body.body));
	response.status(200).send(newNote);
});

router.get("/", function (request, response) {
	response.render("home", { todoItems: todoData.getAll()});
});

module.exports = router;


