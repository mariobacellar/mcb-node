"use strict";

const mongoose	= require('mongoose');
const Schema 	= mongoose.Schema;

let ProductSchema = new Schema({
    nome:{
    	type	: String, 
    	required: true	,	 
    	max		: 100
    },
    categoria:{
    	type    : String	, 
    	required: true	, 
    	max     : 100
    },
    pcusto:{
    	type	: Number, 
    	required: true
    },
    pvenda:{
    	type	: Number, 
    	required: true
    },
    qtd:{
    	type	: Number, 
    	required: false 
    }
    ,
    modified: {
        type    : Date,
        default : Date.now
    }
});


module.exports = mongoose.model('Product', ProductSchema);