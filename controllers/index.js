
/*
 * GET home page.
 */

var mongoose = require('mongoose')
  , energyUse = mongoose.model('energyUse');


exports.index = function(req, res) {
  energyUse.find({}, function(err, rsp) {
    res.render('index', { 
      title: 'IS683 - Data Visualization: Energy Use Data', 
      energyUse: rsp,
      foo: 'bar',
      country: rsp.country,
      data: rsp.data,
      id: rsp._id 
    });
 });
}
