// Create web server

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/comments');

// Create schema
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Create web server
var app = express();

// Use body parser to parse POST requests
app.use(bodyParser.urlencoded({extended: true}));

// Set view engine to ejs
app.set('view engine', 'ejs');

// Set up static files
app.use(express.static('public'));

// Set up GET request
app.get('/', function(req, res) {
    // Find all comments from database
    Comment.find({}, function(err, comments) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {comments: comments});
        }
    });
});

// Set up POST request
app.post('/', function(req, res) {
    // Create new comment
    var newComment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    // Save comment
    newComment.save(function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            console.log(comment);
            res.redirect('/');
        }
    });
});

// Listen for requests
app.listen(3000, function() {
    console.log('Server started on port 3000');
});