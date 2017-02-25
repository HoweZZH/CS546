const express = require('express'),
	app = express(),
	flash = require('connect-flash'),
	bodyParser = require('body-parser'),
	configureRoutes = require('./routes'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	exphbs = require('express-handlebars'),
	Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
	defaultLayout: 'main',
	// Specify helpers which are only registered on this instance.
	helpers: {
		asJSON: (obj, spacing) => {
			if (typeof spacing === "number")
				return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

			return new Handlebars.SafeString(JSON.stringify(obj));
		}
	},
	partialsDir: [
		'views/partials/'
	]
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
	if (req.body && req.body._method) {
		req.method = req.body._method;
		delete req.body._method;
	}
	// let the next middleware run:
	next();
};

//set up express for password
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false // true for https
	}
}))

app.use(flash());
app.use(cookieParser()); 

//static page 
app.use('/public', express.static(__dirname + '/public'));

//body parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

// setup for handle bars 
app.use(rewriteUnsupportedBrowserMethods);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configureRoutes(app);

app.listen(3000, 'localhost', () => {
	console.log('server running on http://localhost:3000');
});

