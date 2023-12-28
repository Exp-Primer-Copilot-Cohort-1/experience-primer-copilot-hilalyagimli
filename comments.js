// Create web server
// Run: node comments.js
// Access: http://localhost:3000
// To stop: Ctrl + c

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Comment = require('./models/comment');

// Connect to mongodb
mongoose.connect('mongodb://localhost/comment');

// Set view engine
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(__dirname + '/public'));

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set routes
app.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { comments: comments });
    }
  });
});

app.post('/', function(req, res) {
  Comment.create(req.body.comment, function(err, newComment) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server started');
});