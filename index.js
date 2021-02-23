// Loads the express module
const express = require('express');

// Creates our express server
const app = express();

const port = 3000;

let exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

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
    const ratties = JSON.parse(data);
    res.render('home', ratties);
  });
});

app.listen(port, () => console.log(`App listening to port ${port}`));