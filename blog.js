var mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
  title: String,
  text: String,
});

module.exports = mongoose.model('blog', blogSchema);