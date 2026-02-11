var p1 = new Promise(function(resolve, reject) {       
	setTimeout(function() { 
		resolve("Hellllll");
	}, 10*1000);
});


module.exports.hello = function(){
	
	console.log("-  Hello - ");
	var ret = "";

	p1.then ( function(value){
		console.log(value);
		ret = value;
	}).finally( () => {
		console.log("finally...");
		return ret;
	});

};