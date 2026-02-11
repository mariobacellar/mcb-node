const mongoose      = require('mongoose');

//const Schema        = mongoose.Schema;
//const PointLocation       = require('../models/pointLocation.model');
//const pointLocationSchema = new PointLocation();

const pointLocationSchema = new mongoose.Schema({
  type       : {type: String  , enum: ['Point'], required: true}, //'Point'
  coordinates: {type: [Number]                 , required: true}  // lat,long: [-104.9903, 39.7392]
});


const RadarSchema   = new mongoose.Schema({
    username:{
    	type    : String, 
    	required: true, 
    	unique  : true
    }
    ,status:{
    	type    : String, 
    	required: true
    }
	,location:{
    	type    : pointLocationSchema, 
    	required: false
   	}
    ,
    modified: {
      type    : Date,
      default : Date.now
    }
});

module.exports = mongoose.model('Radar', RadarSchema);