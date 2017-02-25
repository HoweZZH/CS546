const express = require('express');
const router = express.Router();
const data = require("../data");
const eventsData = data.events;
const locationsData = data.locations;
const peopleData = data.people;
const path = require('path');
// Single Event Page
router.get("/:id", (req, res) => {
    eventsData.getEvent(req.params.id).then(event => {
        // console.log(event);
        return event;
    }).then(event=>{
        peopleId=event.attendees;//get people id
        let a=[]; // get all person data
        for(let i=0;i<peopleId.length;i++){
            a.push(peopleData.getPerson(peopleId[i]).then());
        };
        return Promise.all(a).then(people=>{
            return [event,people];
        });
    }).then(list=>{
        return locationsData.getLocation(list[0].location).then(location => {
            list.push(location.name);
            return list;
            });
    }).then(list=>{
        res.render('events/single', {event: list[0], people: list[1], locationName: list[2]});
    }).catch(e => {
        console.log(e);
        let route = path.resolve(`static/404.html`);
        res.sendFile(route);
    });
    // Find a event by the provided id, 
    // then display its information
    // As well as listing the names of all the attendees that will be at this event 
    // Each of these attendee names will need to link to their person page
    // You will also list the location of the event, said location's name, and a link to the location page

    // If a event is not found, display the 404 error page
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Event Index Page
router.get("/", (req, res) => {
    // Display a list of all events; it can be in an unordered list, or a table
    // Each of these events need to link to the single event page
    eventsData.getAllEvents().then(allEvents => {
        res.render('events/all', {allEvents: allEvents});
    }).catch(e => {
        console.log(e);
        let route = path.resolve(`static/404.html`);
        res.sendFile(route);
    });
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;