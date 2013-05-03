
/*
 * GET courses.
 */

var mongoose = require('mongoose')
  , energyUse = mongoose.model('energyUse');

exports.getData = function (req, res) {
  energyUse.find({}, function(err, energyUse) {
    res.render('energyUse', {
      title: 'IS683 - Data Visualization',
      energyUse: energyUse,
      id: energyUse._id,
      country: energyUse.country
    });
  });
}

exports.jsonlist = function (req, res) {
  energyUse.find({}, function(err, energyUse) {
    res.send(energyUse);
  });
}

exports.findById = function (req, res) {
  energyUse.findOne({_id : req.params.cid}, function(err, energyUse) {
      res.render('energyUse', {
      title: 'Countries',
      country: energyUse.country,
      id: energyUse._id,
      data: energyUse.data
    });
 });
}


