// ====================== CONFIG ======================
var express     = require('express');
var app         = express();
var path        = require('path');
var http        = require('http').Server(app);
var bodyparser  = require('body-parser');
var session     = require('express-session');
var morgan      = require('morgan');
var mpromise    = require('mpromise');
var favicon     = require('serve-favicon');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//middlewares
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Method override for PUT and DELETE in HTML: https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2
// -------------------------------------------------------------------------------------------------------------------------------
// In both HTML4 and HTML5 spec, it says that the only HTTP methods that HTML form element should allow are "GET" and "POST". 
// There is no clear reason why PUT and DELETE are not supported by 'HTML form'. 
// My understanding is POST can be more effectively reused to support PUT and DELETE method. 
// PUT and DELETE typically don't redirect to an appropriate page, while POST will redirect accordingly.
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
/////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
// MongoDB
/////////////////////////////////////////////////////////////////////////////
const dbConfig      = require('./config/db.mongo.cfg.js'); // url: 'mongodb://localhost:27017/barpraia'
const mongoose      = require('mongoose');
const mongoDB       = process.env.MONGODB_URI || dbConfig.url;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { 
    keepAlive       : true, 
    useNewUrlParser : true, 
    useCreateIndex  : true, 
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
var 
db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/////////////////////////////////////////////////////////////////////////////


/*
// ====================== DB CONECTION ======================
//  mongoDB
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost/nodejs");
mongoose.connect("mongodb+srv://admin:admin@cluster0-rv6nl.mongodb.net/barpraia?retryWrites=true&w=majority");
var db = mongoose.connection;

//  connection handler
db.on('error', function () {
    console.log("Mongo  Connection Failed! ");
});
db.once("connected", function () {
    console.log("Mongo Connected");
});
*/

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
var User    = mongoose.model("users", userSchema);
var Message = mongoose.model("messages", messageSchema);





//====================================================================================================================
// Produto
//====================================================================================================================
const produtoRouter  = require("./routers/produto.router");
app.use('/produtos', produtoRouter);

const radarRouter  = require("./routers/radar.router");
app.use('/radar', radarRouter);

//====================================================================================================================




// ====================== ROUTES ======================
//  index
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/gps', function (req, res) {
    //res.sendFile(__dirname + '/views/index.html');
    res.render("gps");
});


app.get('/home', function (req, resp) {
    if (req.session.auth)
        resp.render('home')
    else
        resp.json({ status: false, msg: "access denied" });
});


//  check session and login handling
app.post('/sign-in', function (req, res, next) {

    console.log("[/sign-in]"+JSON.stringify(req.body));

    User.findOne({ username: req.body.username }, function (err, user) {

        if (err) throw err;

        if (user) {

            if (user.pwd === req.body.password) {
                
                req.session.auth = { username: req.body['username'] };
                //res.json({ status: "true", redirect: "/chat", msq: "success ... you are sign in" });
                //res.redirect('/chat');
                console.log("Achou o usuario");
                res.redirect('/home');
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



app.post('/sign-up', function (req, resp, next) {

    var request = req.body;
    var is_not_empty = (request.username.length && request.password.length);

    if (is_not_empty) {
        User.find({ username: request.username }, function (err, users) {

            if (err) throw err;

            if (users.length) {
                resp.json({ status: false, msg: "this username is taken befor you, try another one ." })
            }
            else {
                var newUser = new User({
                    username: request.username,
                    password: request.password
                });
                newUser.save();

                resp.json({
                    status: true,
                    msg: " success sign up" +
                        "username:" + request.username +
                        " password:" + request.password
                });

            }
        });
    }
    else {
        resp.json({ status: false, msg: "invalid inputs !!! open your eyes -_- !" });
    }

});



app.get("/logout", function (req, resp, next) {
    req.session.auth = null;
    resp.json({ status: true, redirect: "/" });
});

//  chatroom 
app.get('/chat', function (req, resp) {
    if (req.session.auth)
        resp.render('chat');
    else
        resp.json({ status: false, msg: "access denied" });

});



    
// app.post('/ ', function (req, resp) {
//     if (req.session.auth)
//         resp.render('produtoDet');
//     else
//         resp.json({ status: false, msg: "access denied" });
// });


// app.get('/planos', function (req, resp) {
//     resp.render('planos')
// });



// app.use(function(err, req, res, next) {
//   console.error("####"+err.stack);
//   res.status(500).send('Something broke!');
// });

const createError = require('http-errors');

// 404
app.use((req, res, next) => { next(createError(404)); });

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
/////////////////////////////////////////////////////////////////////////////



//Listen on port 3000
server = app.listen(3000)



//====================================================================================================================
// Chat
//====================================================================================================================
//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')
    // console.log(user.)
    //default username
    socket.username = "Anonymous"



    
    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    })

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username })
    })
})
