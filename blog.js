const mongoose = require('mongoose');

require('dotenv').config();

// Connection
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
    arguments : String
});

const Post = mongoose.model('post', postSchema);

// Functions
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
}

// Export
module.exports = {
    Post
};

// Run
Connect().catch(err => console.log(err));