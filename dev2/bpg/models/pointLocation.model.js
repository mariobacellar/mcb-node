const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PointLocationSchema = new mongoose.Schema({
  type: {
  	type: String, 
  	enum: ['Point'], //'Point'
  	required: true
  }, 
  coordinates: {
  	type    : [Number],  // lat,long: [-104.9903, 39.7392]
  	required: true 
  }  
});



module.exports = mongoose.model('PointLocation', PointLocationSchema); 