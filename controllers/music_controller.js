const Music=require('../models/music');
const Category=require('../models/category');

module.exports.uploadPage=(req,res)=>{
    res.render('uploadsonginfo',{
        title:'About Song',
        path:req.route.path
    });
}

module.exports.uploadSong=(req,res)=>{
    res.render('upload_song',{
        title:'Upload Song',
        name:req.params.name,
        path:req.route.path
    });
}
module.exports.upload_info=async (req,res)=>{
    try {
        Music.findOne({name:req.body.name},async (error,music)=>{
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
                
               let song=await Music.create({name:req.body.name,
                    singername:req.body.singername});
                    console.log('Song id',song._id);
                    
                    res.redirect(`/music/uploadSong/${song._id}`);
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
        console.log('Uploading song id');
        console.log(req.params.id);
        
        let uploaded_music=await Music.findByIdAndUpdate(req.params.id);
        console.log('Uploaded Music',uploaded_music);
        Music.uploadedAvatar(req,res,function(err){
            if(err){
                console.log('Multer Error : ',err);
            }
            console.log(req.file);
            
            if(req.file){
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

module.exports.uploadSongAdmin=async (req,res)=>{
    try {

        let category=await Category.find({});
        console.log(category);
        res.redirect('back');
        if(category){

        }
    } catch (error) {
        
    }
}