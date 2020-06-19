const Music=require('../models/music');
const mongo = require('mongodb');
const Grid = require('gridfs-stream');
const db=require('../config/mongoose');
const gfs = Grid(db, mongo);

module.exports.uploadPage=(req,res)=>{
    res.render('uploadsonginfo',{
        title:'About Song'
    });
}

module.exports.uploadSong=(req,res)=>{
    res.render('upload_song',{
        title:'Upload Song',
        name:req.params.name
    });
}
module.exports.upload_info=async (req,res)=>{
    try {
        Music.findOne({name:req.body.name},(error,music)=>{
            if(error){
                console.log('Error in finding song');
                res.redirect('back');
            }
            if(music){
                console.log('Music with same name exists');
                res.redirect('back');
            }
            else{
                console.log('Record Created');
                
                Music.create({name:req.body.name,
                    singername:req.body.singername});

                    res.redirect(`/music/uploadSong/${req.body.name}`);
            }
        })
    } catch (error) {
        if(error){
            console.log('Error occured'); 
        }
    }    
}

module.exports.upload_song=async (req,res)=>{
    try {
        console.log('Uploading song');
    
        let uploaded_music=await Music.findOneAndUpdate({name:req.params.name});
        console.log('Uploaded Music',uploaded_music);
        
        Music.uploadedAvatar(req,res,function(err){
            if(err){
                console.log('Multer Error : ',err);
            }
            console.log(req.file);
            
            if(req.file){
                console.log(Music.avatarPath);
                console.log(req.file.filename);
                
                uploaded_music.song=Music.avatarPath+'/'+req.file.filename;
            }
            uploaded_music.save();
            res.redirect('back');
        })       
    } catch (error) {
        if(error){
            console.log('Caught error',error);
        }
    }
     
}

module.exports.playsong=(req,res)=>{
    console.log(req.params.filename);
    const readstream = gfs.createReadStream({name: req.params.filename})
   readstream.on('error', function (error) {
        res.sendStatus(500)
   })
   res.type('audio/m4a')
   readstream.pipe(res)
}