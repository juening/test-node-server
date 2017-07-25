const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');


app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', function(error){
    if(error) {
      console.error('Unable to append to server.log');
    }
  });
  console.log('Now is ', log);
  next();
});

app.use((req,res) => {
  res.render('maintenance.hbs', {
    maintenanceMessage: 'Under maintenance, will be back soon.'
  });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',

  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome to the Website',
  });
});

app.listen(port, ()=>{
  console.log("Listening to port ", port);
});
