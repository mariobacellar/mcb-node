const ctrl	  = require('../controllers/radar.controller');
const router  = require('express').Router();

router
.get 	('/:lat/:lng'	, ctrl.setLocation)
.put 	('/:lat/:lng'	, ctrl.setLocation2)
;

module.exports = router;