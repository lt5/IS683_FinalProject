var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * energyUse Schema
 */



var energyuseSchema = new Schema({
	country: String,
	data: Object
}, {collection:'energyUse'});

mongoose.model('energyUse', energyuseSchema);
