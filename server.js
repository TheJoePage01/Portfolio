const blog = require('./blog.js')

const express = require('express');
const app = express();

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

blog.Post.find({}, function(err, posts) {
    if(!err){
        posts.forEach(post => {
            app.get(`/blog/${post._id}`, function(req, res){
                res.send(post._id);
            });
        });
    }
});

app.listen(port=process.env.PORT, function(){
    console.log('Server running on port ' + process.env.PORT);
});