var express = require('express');
var path = require('path');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://username:password@ds041432.mlab.com:41432/blog');

var Blog = require('./blog');

var port = 3000;

var body = require('body-parser');
app.use(body.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// GET ROUTES
app.get("/", function(req, res) {

	res.render("index");

});

app.get("/about", function(req, res) {

	res.render("about");

});

app.get("/blog", function(req, res) {

	try {
		Blog.find({}).exec(function(err, blogs) {
			
			if (err)
				res.error(err);
			
			res.render("blog", {blogs: blogs});
			
		});
		
		
	} catch(e) {
		
		res.error(e);
		
	}

});

app.get("/blog/create", function(req, res) {
	
	res.render("createBlog");
	
})


// POST ROUTES
app.post("/database/create", function(req, res) {
	
	console.log(req.body);
	var newBlog = new Blog({title: req.body.blogTitle, text: req.body.blogText});
	newBlog.save(function(err, newBlog) {
		
		if (err) return res.error(err);
		
	})
	
	res.json({success: "true"});
	
})

app.listen(port, function() {
	console.log('Listening on port:', port);
});
