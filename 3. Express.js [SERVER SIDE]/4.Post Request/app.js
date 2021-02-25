const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/login', (req, res)=> {
    res.render('login');
})

app.get('/dashboard', (req,res)=> {
    res.render('dashboard');
})

app.post('/login', (req,res)=> {
    let username = req.body.username;
    let password = req.body.password;

    if(username === 'john' && password === 'pass'){
        res.redirect('/dashboard');
    }

});

app.listen(3000, ()=> {
    console.log('Server started at port 3000.');
})