'use strict';

/*
 * Dev Note:
 * [Tue May 29 13:19:52 2018]: I got the first working code to keep a
 * Javascript file running. I have no idea if this is the best way to
 * do it but I will take on a bit of technical debt because I could 
 * not successfully do a google search to find the optimal way of 
 * doing this. I will write unit tests and try/catch tests to keep
 * testing functionality.
 */

/*
 * Title: apiRequests
 * Description: Every minute this module will send an api request
 *  to the hackernews api to get the latest top link.
 *
 */

/*
 * Methods of achieving goal:
 * - Make a cron job that every minute runs the apiRequests script
 * - Make the script itself run every minute 
 */

var Post = require('../models/Post');
var mongoose = require('mongoose');
var hn = require('hackernews-api');
var url = "mongodb://localhost:27017/hndb";
const sleep = require('util').promisify(setTimeout);

async function main() {
    var goOn = true;
    var postChanged= false;

    while(goOn) {
  	// Connect to DB
        mongoose.connect(url);
     	var db = mongoose.connection;
     	db.on('error', console.error.bind(console, 'connection error:'));
     	db.once('open', function() {
        console.log('db is open');
     	var topPostId = hn.getTopStories();

     	var firstTopPost = hn.getItem(topPostId[0]);
     	console.log(firstTopPost);
        var myData = new Post({hnid: firstTopPost.id, title: firstTopPost.title, url: firstTopPost.url, votes: firstTopPost.score});
            myData.save().catch(err => {
            console.log(err);
            });
            console.log('successful save');
        });
        await sleep(3000);
    }
}

main();
