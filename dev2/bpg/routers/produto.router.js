const ctrl	  = require('../controllers/produto.controller');
const router  = require('express').Router();

router
.post	('/'   			, ctrl.create )
.get 	('/new'         , ctrl.new    )
.get 	('/'   			, ctrl.findAll)
.get 	('/:id'			, ctrl.findOne)
.get 	('/:id/edit'	, ctrl.edit	  )
.put 	('/:id/update'	, ctrl.update )
.delete ('/:id'			, ctrl.delete )
;

module.exports = router;