const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv=require('dotenv');
const connectDatabase=require('./server/config/database');
const methodOverride = require('method-override');
const {Article}=require('./server/models/article');
const app = express();


dotenv.config({path:'./server/config/config.env'});
connectDatabase();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

require('./server/middleware/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  Article.find({}, (error, articles) => {
    if (error) {
      console.log(error);
    } else {
      res.render("index", {
        title: "Articles",
        articles: articles,
      });
    }
  });
});

const users=require('./server/routes/users');
const articles=require('./server/routes/articles');
app.use('/users', users);
app.use('/articles', articles);

// Start Server
app.listen(process.env.PORT, () => {
    console.log('Server started on port 3000...');
  });