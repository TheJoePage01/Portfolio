const mongoose = require('mongoose');

// Connection
async function Connect() {
  await mongoose.connect('mongodb+srv://Alex:<password>@blog.xdaaqwe.mongodb.net/?retryWrites=true&w=majority');

}

// Schema
const postSchema = new mongoose.Schema({
    title : String,
    subTitle : String,
    date : String, // need to change it to date format
    author : String, 
    text : String,
    arguments : List<String>{}
});

// Functions
function UploadNewPost(title, subTitle, author, text, arguments){
    const newPost = new blogSchema({
        title : title,
        subTitle : subTitle,
        date : "1/1/2023", // need to change it to a date
        author : author, 
        text : text,
        arguments : arguments
    });

    console.log(`A new post has been added! Check it out! http://alexsteiner.dev/blog/${newPost._id}`);

}

// Run
Connect().catch(err => console.log(err));