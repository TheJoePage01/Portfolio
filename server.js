const express = require('express');
const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/projects', function(req, res){
    res.render('projects');
});

app.listen(port=PORT, function(){
    console.log('Server running on port ' + PORT);
});