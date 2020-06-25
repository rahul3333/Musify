const Music=require('../models/music');
const Category=require('../models/category');
const adminMusic=require('../models/music_admin');

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

module.exports.Adminupload=(req,res)=>{
    res.render('adminupload',{
        title:'Admin Upload',
        path:req.route.path
    })
}

module.exports.AdminSongUpload=(req,res)=>{
    res.render('adminuploadsong',{
        title:'Upload Song',
        path:req.route.path,
        id:req.params.id
    })
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
        let music=await adminMusic.findByIdAndUpdate(req.params.id);
        adminMusic.uploadedAvatar(req,res,function(err){
            if(err){
                console.log('Error occured while uploading music through admin');
                res.redirect('back');
            }
            if(req.file){
                music.adminsong=adminMusic.avatarPath+'/'+req.file.filename;
            }
            music.save();
        })
        const uploading_category=await Category.findByIdAndUpdate(music.category);
        
        uploading_category.adminmusic.push(music.id);
        uploading_category.save();
        res.redirect('back');
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}

module.exports.uploadSongInfoAdmin=async (req,res)=>{
    try {

        let cat=await Category.findOne({category_name:req.body.category_name});

        let upload=await adminMusic.create({admin_music_name:req.body.admin_music_name,
                                            singername:req.body.singername,
                                            category:cat.id})   
        res.redirect(`/music/adminsongPage/${upload.id}`);    
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}