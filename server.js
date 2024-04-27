

//const express = require('express');
//const session = require('express-session');
//const exphbs = require('express-handlebars');
//const path = require('path');


const express = require('express');
const exphbs = require('express-handlebars');
const session = require('./config/session');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const routes = require('./controllers');

// Set up Handlebars.js as your template engine
const hbs = exphbs.create({ /* config options if any */ });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up session with Sequelize store
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(session({
  secret: 'super secret', // Use an environment variable for production
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
app.use(express.static(path.join(__dirname, 'public')));

// Add routes
app.use(routes);

// Start the server and sync database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
