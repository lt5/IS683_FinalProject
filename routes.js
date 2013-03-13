module.exports = function (app) {

var index = require('./controllers/index');
var courses = require('./controllers/courses');
var users = require('./controllers/users');
//var assignments = require('./controllers/assignments');

  app.get('/', index.index);
 
  app.get('/courses', courses.list);
  app.get('/courses/:cid', courses.findById);
  app.post('/courses/add', courses.add);
  app.post('/courses/update/:cid', courses.update); 
 
  app.get('/users/', users.list);
  app.get('/users/:uid', users.findById);
  app.post('/users/add', users.add);
  app.post('/users/update/:uid', users.update);
/*
  app.get('/assignments/:cid/', assignments.list);
  app.get('/assignments/:cid/:aid/', assignments.findOne);
  app.post('/assignments/add/', assignments.add);
*/
}
