const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Musify',{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify:false });

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to db'));

db.once('open',function(){
    console.log('Successully connected to database');
});

module.exports=db;