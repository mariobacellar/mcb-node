var express = require('express');
var router  = express.Router();
var mongoose   = require('mongoose');


// ====================== DB CONECTION ======================
//  mongoDB
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost/nodejs");
mongoose.connect("mongodb+srv://admin:admin@cluster0-rv6nl.mongodb.net/barpraia?retryWrites=true&w=majority");
var db = mongoose.connection;

//  Schemas
var userSchema = new mongoose.Schema({
    username: String,
    pwd: String
});
var messageSchema = new mongoose.Schema({
    username: String,
    message: String
});

//  Models
var User = mongoose.model("users", userSchema);
var Message = mongoose.model("messages", messageSchema);

//  connection handler
db.on('error', function () {
    console.log("Mongo  Connection Failed! ");
});
db.once("connected", function () {
    console.log("Mongo Connected");
});
// ====================== DB CONECTION ======================



/* Home page / index */
router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Bar Praia' });

  	console.log("$$$$$$$$$$"+JSON.stringify(req.body) );

    User.findOne({ email: req.body.email }, function (err, user) {

        if (err) throw err;

        if (user) {
            if (user.pwd === req.body.password) {
                req.session.auth = { email: req.body['username'] };
                // resp.json({ status: "true", redirect: "/chat", msq: "success ... you are sign in" });
                res.redirect('/index');
            }
            else {
                res.json({ status: false, msg: "wrong password or username !!" });
            }
        }
        else {
            res.json({ status: false, msg: "you are not sign up here !!" });
        }
    })


});


module.exports = router;
