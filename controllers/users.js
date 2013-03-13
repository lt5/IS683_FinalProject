
/*
 * GET courses.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User');


exports.list = function(req, res) {
  User.find({}, function(err, users) {
    res.render('users', { 
      title: 'Personal Learning Platform', 
      users: users 
    });
 });
}
exports.findById = function (req, res) {
  User.findOne({_id : req.params.uid}, function(err, user) {
      console.log(user);
      res.render('user', {
      title: "User Page",
      id: user._id,
      username: user.username,
      password: user.password 
    });
 });
}

exports.add = function (req, res) {
  var user = new User(req.body);
  console.log('test'); 
  user.save(function (err) {
    if(err) {
      console.log(err)
    } else {
      res.redirect('/users/'+user._id);
      console.log(user);
    }

  });
}

exports.update = function (req, res) {
  User.findOneAndUpdate({_id : req.params.uid}, req.body, 
  
  function(err, user) {
      console.log(user);
    res.redirect('/users/');
  });
}
