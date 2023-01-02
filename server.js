const express = require('express');
const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/projects', function(req, res){
    res.render('projects');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.listen(port=PORT, function(){
    console.log('Server running on port ' + PORT);
});