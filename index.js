const express=require('express');
const port=8000;
const path=require('path');
const ejs=require('ejs');
const app=express();
const bodyParser=require('body-parser');
const layouts=require('express-ejs-layouts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(layouts);
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views','./views');


app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log('Error while Running Server');
        return;
    }
    console.log(`Server running on port ${port}`); 
});