"use strict";

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const pointSchema = new mongoose.Schema({
  type       : {type: String  , enum: ['Point'], required: true}, //'Point'
  coordinates: {type: [Number]                 , required: true}  // lat,long: [-104.9903, 39.7392]
});

const statesArray = ["AC", "AL", "AM", "AP"," BA", "CE", "DF", "ES"," GO", "MA", "MG", "MS", "MT", "PA","PB", "PE","PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"];

const UserSchema = new Schema({
	name: {
        type    : String, 
        required: true
    }
    ,
    username:{
    	type    : String, 
    	required: true, 
    	unique  : true
    }
    ,
    email:{
    	type    : String, 
    	required: true, 
    	unique  : true
    }
    ,
    pwd:{
    	type    : String, 
    	required: false
    }
    ,
	address:{
		street: {
    		type     : String, 
    		required : false
    	}, 
		city  : {
    		type     : String, 
    		required : false
    	}, 
		state : {
			type     : String, 
			uppercase: false, 
			required : false, 
			enum     : statesArray
		}, 
		zip   : {
    		type     : Number, 
    		required : false
    	}
	}
	,
    credit:{
    	type    : Number, 
    	required: false
    }
    ,
    credExpDate:{ // "2017-11-25T00:00:00.000Z"
    	type	: Date, 
        default : Date.now,
    	required: false
    }
	,
    mode:{
    	type    : String, 
    	enum    : ['seller', 'buyer'], 
    	required: true
    }
   	,
    created: {	// "2017-11-25T00:00:00.000Z"
    	type	: Date, 
    	required: false
    }
    ,
    modified:{
        type    : Date,
        default : Date.now
    }
	, 
    location:{
    	type    : pointSchema, 
    	required: false
   	}
});

module.exports = mongoose.model('User', UserSchema);