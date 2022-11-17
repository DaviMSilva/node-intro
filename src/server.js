const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();

const loginController = require('./controllers/loginController');
//uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//view engine

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  return res.redirect('/login');
});
app.get('/login', (req, res) => {
  return res.render('login');
});
app.get('/cadastrar', (req, res) => {
  return res.render('cadastrar');
});

app.post('/login', loginController.login);
app.post('/cadastrar', loginController.signin);

app.listen(3333);
