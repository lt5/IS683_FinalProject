module.exports = function (app) {

var index = require('./controllers/index');
var energyUse = require('./controllers/energyUse');
//var assignments = require('./controllers/assignments');

  app.get('/', index.index);
  app.get('/energyUse', energyUse.getData);
  app.get('/api/energyUse', energyUse.jsonlist);
  
  app.get('/api', function (req,res) {
    var obj = {
      spam: 'test'
    }
    res.send(obj);
  });

/*
  app.get('/assignments/:cid/', assignments.list);
  app.get('/assignments/:cid/:aid/', assignments.findOne);
  app.post('/assignments/add/', assignments.add);
*/
}
