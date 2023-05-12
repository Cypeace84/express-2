const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');

// app.engine('.hbs', hbs());
app.engine(
  'hbs',
  hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })
);
app.set('view engine', '.hbs');

// app.use((req, res, next) => {
//   res.show = (name) => {
//     res.sendFile(path.join(__dirname, `/views/${name}`));
//   };
//   next();
// });
app.use(express.static(path.join(__dirname, '/public')));

app.use('/user', (req, res, next) => {
  // res.show('forbidden.html');
  res.render('forbidden');
});

app.get('/', (req, res) => {
  // res.show('home.html');
  res.render('home');
});

app.get('/about', (req, res) => {
  // res.show('about.html');
  res.render('about');
});
app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});
// app.get('/hello/:name', (req, res) => {
//   res.send(`Hello ${req.params.name}`);
// });
app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.use((req, res) => {
  res.render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
