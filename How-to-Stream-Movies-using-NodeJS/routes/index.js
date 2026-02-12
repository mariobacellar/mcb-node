let express = require('express');

let router  = express.Router();

//	->	Display the index view with the video tag
router.get('/', function(req, res, next)	{ res.render('index', { base_url: process.env.BASE_URL }); });

module.exports = router;
