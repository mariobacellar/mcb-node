const Radar = require('../models/radar.model');



exports.setLocation = (req, res) => {

    console.log("setLocation...: "+JSON.stringify(req.params));
    //console.log("radar.username=["+radar.username+"]");

    let radar = {
		username: "mario.bacellar",
		status  : "radar-off",
		location: { type: "Point", coordinates: [req.params.lat, req.params.lng] }
    };


    Radar.findOneAndUpdate(	{username: radar.username}, {$set: radar}, {upsert: true} ).then(data => {
        
    	console.log("data=["+JSON.stringfy(data)+"]");

        if( !data) {
           return res.status(404).send({ message: "Radar not found with iusername " + req.params.username});
        }

	    res.render("home");

    }).catch(err => {
        
		console.log("err=["+JSON.stringify(err)+"]");

        if(err.kind === 'ObjectId') {
            return res.status(404).send({ message: "Radar not found with id " + radar.username});
        }
        
//        return res.status(500).send({ message: "Error updating Radar with username " + radar.username });
res.render("home");

    });

};


exports.setLocation2 = (req, res) => {

    console.log("setLocation2...: "+JSON.stringify(req.params));
	console.log("req.body......:["+JSON.stringify(req.body)+"]");
    console.log("username......: "+req.body.username);
    console.log("status........: "+req.body.status);
    console.log("lat...........: "+req.params.lat);
    console.log("lng...........: "+req.params.lng);

    let radar = 
    //new Radar(
    {
		username: req.body.username,
		status  : "radar-on",
		location: { type: "Point", coordinates: [req.params.lat, req.params.lng] }
    }
    //);
	console.log("radar.........:["+JSON.stringify(radar)+"]");

    Radar.findOneAndUpdate(	{username: radar.username}, {$set: radar}, {upsert: true} )
    .then(data => {
//   radar.save().then(data => {
	    res.render("home");
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating the Product." });
    });

};
