const mongoose = require('mongoose');

const express = require('express');
const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Index
app.get('/', function(req, res){
    res.render('index');
});

// About
app.get('/about', function(req, res){
    res.render('about');
});

// Projects
app.get('/projects', function(req, res){
    res.render('projects');
});

// Contact
app.get('/contact', function(req, res){
    res.render('contact');
});

// Blog
app.get('/blog', async function(req, res){
    var posts = await GetLatestPosts(5);

    res.render('blog', { 
        posts : (await posts)
    });
});


// Mongoose Connection
async function Connect() {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_STRING);

    console.log('Connected to database!');
}

// Schema
const postSchema = new mongoose.Schema({
    title : String,
    subTitle : String,
    date : String, // need to change it to date format
    author : String, 
    text : String,
    arguments : Array
});

const Post = mongoose.model('post', postSchema);

// Functions
function ReloadPosts(){
    Post.find({}, function(err,posts) {
        if(!err){
            posts.forEach(post => {
                app.get(`/blog/${post._id}`, function(req, res){
                    res.render('post', {
                        post : post
                    });
                });
            });

            console.log('All posts were updated!');
        }
    });
}

async function GetLatestPosts(amount){
    var x = await Post.find().sort({ _id: -1 }).limit(amount);
    var y = [];

    await x.forEach(z =>{
        y.push(z);
    });

    console.log("Latests posts where loaded!");
    return y;
}

function UploadNewPost(title, subTitle, author, text, arguments){
    const newPost = new Post({
        title : title,
        subTitle : subTitle,
        date : "1/1/2023", // need to change it to a date
        author : author, 
        text : text,
        arguments : arguments
    });

    newPost.save();

    console.log(`A new post has been added! Check it out! http://alexsteiner.dev/blog/${newPost._id}`);

    ReloadPosts();
}


// Run
app.listen(port=process.env.PORT, async function(){
    console.log('Server running on port ' + process.env.PORT);
    Connect().catch(err => console.log(err));
    
    ReloadPosts();
});