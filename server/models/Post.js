'use strict';

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    hnid: Number,
    title: String,
    url: String,
    votes: Number,
    initTimeAsTop: Number,
    finalTimeAsTop: Number
});

module.exports = mongoose.model('Post', postSchema);
