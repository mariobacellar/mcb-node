require('./models/database');

const express 		= require('express');
const app 			= express();
const path 			= require('path');
const exphbs 		= require('express-handlebars');
const bodyparser 	= require('body-parser');



app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, ()=>{
    console.log('Express server started at port: 3000');
});


const homeController     = require('./controller/homeController');
const employeeController = require('./controller/employeeController');


app.use('/'			, homeController);
app.use('/employee'	, employeeController);
