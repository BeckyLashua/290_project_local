// Loads the express module
const express = require('express');

// Creates our express server
const app = express();


let exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = 3000;

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
    console.log(parsedData);
    res.render('home', parsedData);
  });
});

app.use(function(req,res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});
  
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error'); 
});

app.listen(port, () => console.log(`App listening to port ${port}`));