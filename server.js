const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});
app.use(express.static(path.join(__dirname, '/public')));

app.use('/user', (req, res, next) => {
  res.show('forbidden.html');
});

app.get('/', (req, res) => {
  res.show('home.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/hello/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.use((req, res) => {
  res.status(404).show('404.html');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
