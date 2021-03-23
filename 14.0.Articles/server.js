const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv=require('dotenv');
const connectDatabase=require('./server/config/database');
const app = express();

dotenv.config({path:'./server/config/config.env'});
connectDatabase();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


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

const userRouter=require('./server/routes/users');
const articleRouter=require('./server/routes/articles');
app.use(userRouter);
app.use(articleRouter);

// Start Server
app.listen(process.env.PORT, () => {
    console.log('Server started on port 3000...');
  });