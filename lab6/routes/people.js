const express = require('express');
const router = express.Router();
const data = require("../data");
const peopleData=data.people;
const eventsData = data.events;
const path = require('path');
// Single Person Page
router.get("/:id", (req, res) => {
    // Find a person by the provided id, 
    // then display their information
    // As well as listing all events that they will be attending
    // Each of these events need to link to the event page, and show the event name
    // If a person is not found, display the 404 error page
    // peopleData.getAllPeople().then((people)=>{
    //     res.send(people);
    // });
    peopleData.getPerson(req.params.id)
    .then(person => {
        return person;
    }).then((person)=>{
        return eventsData.getEventsForAttendee(person.id).then(eventList => {
	    	        return [person,eventList];
                });
    }).then(list=>{
            res.render('people/single', {person: list[0], eventList: list[1]});
    }).catch((e)=>{
        console.log(e);
    	let route = path.resolve(`static/404.html`);
        res.sendFile(route);
    });
    // res.render("/misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// People Index Page
router.get("/", (req, res) => {
    //res.status(404).json({ error: "Event not found" });
    peopleData.getAllPeople()
    .then((people)=>{
        //console.log(eventsData);
        res.render('people/all', {people: people })
    }).catch(() => {
        res.status(404).json({ error: "people get / Event not found" });
    });
    // Display a list of all people; it can be in an unordered list, or a table
    // Each of these people need to link to the single person page
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;