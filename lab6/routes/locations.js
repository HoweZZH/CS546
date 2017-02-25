const express = require('express');
const router = express.Router();
const data = require("../data");
const eventsData = data.events;
const peopleData = data.people;
const locationsData = data.locations;
const path = require('path');
// Single Location Page
router.get("/:id", (req, res) => {
    // Find a location by the provided id, 
    // then display its information
    // As well as listing all events that will be at this location
    // Each of these events need to link to the event page and show the event name
    // If a location is not found, display the 404 error page
    locationsData.getLocation(req.params.id).then(location => {
    	return location;
    }).then((location)=>{
        return eventsData.getAllEvents().then(events => {
    		return [location,events];
    	})
    }).then((list)=>{
        location=list[0];
        events=list[1];
        let eventsAtLocation = events.filter(event=> event.location == location.id);
    		res.render('locations/single', {location: list[0], eventsAtLocation: eventsAtLocation});
    }).catch(e=>{
        console.log(e);
        let route = path.resolve(`static/404.html`);
        res.sendFile(route);
    });
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Location Index Page
router.get("/", (req, res) => {
    // Display a list of all locations; it can be in an unordered list, or a table
    // Each of these locations need to link to the single location page
    locationsData.getAllLocations().then(allLocations => {
    	res.render('locations/all', {allLocations: allLocations});
    }).catch(e=>{
        console.log(e);
        let route = path.resolve(`static/404.html`);
        res.sendFile(route);
    });
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;