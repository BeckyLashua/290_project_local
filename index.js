// Loads the express module
const express = require('express');

// Creates our express server
const app = express();

// Loads the express-handlebars module
let exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.set('port', 3000);

// Will handle both urlencoded and JSON params
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Serves static files (we need this to import a css file)
app.use(express.static('public'));

// Sets a basic route
app.get('/', (req, res) => {
  // Read Json file
  const fs = require('fs');
  fs.readFile("views/data/ratties.json", function(err, data) {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    res.render('home', parsedData);
  });
});

// Renders the About Us page
app.get('/about', (req,res) => {
  res.render('about');
});

// Renders the volunteer page
app.get('/volunteer', (req,res) => {
  res.render('volunteer');
});

// Renders the Adopt page
app.get('/adopt', (req,res) => {
  // Read Json file
  const fs = require('fs');
  fs.readFile("views/data/ratties.json", function(err, data) {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    res.render('adopt', parsedData);
  });
});

// Renders the page seen by user when adoption form is submitted
app.post('/adoptformreceived', (req,res) => {
  let context = {};
  context.firstName = req.body.firstName;
  context.email = req.body.email;
  res.render('adoptformreceived', context);
});

// Handles 404 error
app.use(function(req,res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});
  
// Handles 500 error
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

// Listens on the port signified
app.listen(app.get('port'), function(){
  console.log(
      `Express started on http://${process.env.HOSTNAME}:${app.get(
        'port'
      )}; press Ctrl-C to terminate.`);
});