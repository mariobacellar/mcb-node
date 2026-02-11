const express  = require('express') ;
const router   = express.Router();

 
router.get('/', (req,res) => {
    res.render("home/loginSignin",{
        viewTitle: "Bar Praia - Garçon"
    })
});



module.exports = router;