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
    body: {
        type: String,
        // required: [true, 'a post must have a body'],
        trim: true,
        // unique: true
        default: '',
    },
    photo: {
        type: String,
        trim: true,
        // required: [true, 'a post must have a photo']
    },
    likes: {
        type: Array,
        ref: 'Users'
    },
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
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;