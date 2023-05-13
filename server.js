const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = file.originalname.split('.')[0];
    const fileExtension = file.mimetype.split('/')[1];
    cb(null, fileName + '-' + uniqueSuffix + '.' + fileExtension);
  },
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// app.get('/hello/:name', (req, res) => {
//   res.send(`Hello ${req.params.name}`);
// });
app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
  console.log(req.params);
});

app.get('/contact', (req, res) => {
  res.render('contact');
  console.log(req.params);
});

app.post('/contact/send-message', upload.single('image'), (req, res) => {
  const { author, sender, title, message } = req.body;
  // if (author && sender && title && message && image) {
  if (author && sender && title && message && req.file) {
    const filePath = '/images/' + req.file.filename;
    const fileName = req.file.originalname;
    res.render('contact', {
      isSent: true,
      fileName: fileName,
      filePath: filePath,
    });
    // res.render('contact', { isSent: true });
  } else {
    res.render('contact', { isError: true });
  }
  // res.json(req.body);
  console.log('req.body:', req.body);
});

app.use((req, res) => {
  res.render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
