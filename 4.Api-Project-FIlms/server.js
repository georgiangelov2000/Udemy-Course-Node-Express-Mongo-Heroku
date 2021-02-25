const express = require('express');
const app = express();
const path = require('path');
const request = require('request');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/results',(req,res)=>{
const query=req.query.search

request('http://api.themoviedb.org/3/search/movie?api_key=f57b11794d8aa4a89456264b33442a9c&query='+query,(error,response,body)=>{
    if(error){
        console.log(error)
    }
    let data=JSON.parse(body);
    res.render('movies',{data:data,queryResult:query})
})
})

app.get('/', (req,res)=> {
    res.render('search');
});


app.listen(4000, ()=>{
    console.log('Server started at port 4000.');
});