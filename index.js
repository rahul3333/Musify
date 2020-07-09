const express=require('express');
const port=8000;
const path=require('path');
const ejs=require('ejs');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const app=express();
const db=require('./config/mongoose');
const bodyParser=require('body-parser');
const Grid = require('gridfs-stream');
const passport= require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const layouts=require('express-ejs-layouts');
const MongoStore=require('connect-mongo')(session);

// var change=function(req,res,next){

// }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(layouts);
app.use(express.static('assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.set('view engine', 'ejs');
app.set('views','./views');
// app.use(change);
app.use(session({
    name:'Musify',
    secret:'My_Secret_Key',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:null
    },
    store:new MongoStore(
    {
      mongooseConnection:db,
      autoRemove:'disabled'  
    },
    function(err){
        console.log(err||'connect-mongodb setup ok');
        
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log('Error while Running Server');
        return;
    }
    console.log(`Server running on port ${port}`); 
});