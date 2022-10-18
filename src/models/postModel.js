const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./userModel');
dotenv.config({path: './config.env'});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'a post must have a title'],
        trim: true,
    },
    photo: {
        type: String,
        trim: true,
        required: [true, 'a post must have a photo']
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'Users'
            }
        }
    ],
    comments: [
        {
            text: String,
            commentBy: {
                type: mongoose.Schema.ObjectId,
                ref: 'Users'
            }
        }
    ],
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: [true, 'a post must have a user'],
    },
},
{ timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;