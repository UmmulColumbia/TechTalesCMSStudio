const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;


// Setup Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  //res.send('Welcome to The Tech Blog!');
  res.render('homepage');
});


// Set up Handlebars.js as your template engine
//const hbs = exphbs.create({ /* config options if any */ });
//app.engine('handlebars', hbs.engine);
//app.set('view engine', 'handlebars');

//const exphbs = require('express-handlebars');
////app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//app.set('view engine', 'handlebars');

// Set up session with Sequelize store
app.use(session({
  secret: 'super secret',  // Use an environment variable for production
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Add routes
app.use(routes);

// Start the server and sync database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
