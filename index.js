const express=require('express');
const port=8000;
const path=require('path');
const ejs=require('ejs');
const app=express();
const db=require('./config/mongoose');
const bodyParser=require('body-parser');
const Grid = require('gridfs-stream');
const layouts=require('express-ejs-layouts');


// var change=function(req,res,next){

// }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(layouts);
app.use(express.static('assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.set('view engine', 'ejs');
app.set('views','./views');
// app.use(change);
 

app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log('Error while Running Server');
        return;
    }
    console.log(`Server running on port ${port}`); 
});