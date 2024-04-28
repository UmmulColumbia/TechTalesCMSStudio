//const express = require('express');
//const session = require('express-session');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);
//const exphbs = require('express-handlebars');
//const sequelize = require('./config/connection');
////const routes = require('./controllers');
//const path = require('path');
//const app = express();
//const PORT = process.env.PORT || 3003;


// Setup Handlebars Middleware
//app.engine('handlebars', exphbs({
  //defaultLayout: 'main',
 // layoutsDir: path.join(__dirname, 'views')
//}));
//app.set('view engine', 'handlebars');
//app.set('views', path.join(__dirname, 'views'));

//app.get('/', (req, res) => {
  //res.send('Welcome to The Tech Blog!');
 // res.render('homepage');
//});


// Set up Handlebars.js as your template engine
//const hbs = exphbs.create({ /* config options if any */ });
//app.engine('handlebars', hbs.engine);
//app.set('view engine', 'handlebars');

//const exphbs = require('express-handlebars');
////app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//app.set('view engine', 'handlebars');

// Set up session with Sequelize store
//app.use(session({
 // secret: 'super secret',  // Use an environment variable for production
 // cookie: { secure: true, httpOnly: true },
  //resave: false,
  //saveUninitialized: true,
  //store: new SequelizeStore({
   // db: sequelize
  //})
//}));

// Middleware for parsing JSON and urlencoded form data
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));

//// Add routes
//app.use(routes);

// Start the server and sync database
//sequelize.sync({ force: false }).then(() => {
 // app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
//});





const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const db = require('./config/connection');  // Database connection
const { User, Post, Comment } = require('./models'); // Assuming you have these models

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Handlebars.js as your template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.get('/', async (req, res) => {
  try {
      const posts = await Post.findAll({
          include: [{ model: User, attributes: ['username'] }],
          order: [['createdAt', 'DESC']]
      });
      const postList = posts.map(post => post.get({ plain: true }));

      res.render('homepage', {
          posts: postList,
          logged_in: req.session.logged_in || false
      });
  } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Error loading the homepage');
  }
});


// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Setup session with Sequelize store
app.use(session({
    secret: 'super secret',  // Use an environment variable in production
    store: new SequelizeStore({
        db: db
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set to true if you're using HTTPS
}));

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Use routes
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Sync database and start the server
db.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
    console.error('Failed to sync db: ' + err.message);
});
