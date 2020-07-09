const Music=require('../models/music');
const Category=require('../models/category');
const adminMusic=require('../models/music_admin');

module.exports.uploadPage=(req,res)=>{
    var music=null;
    var record=null;
    res.render('uploadsonginfo',{
        title:'Musify - About Song',
        path:req.route.path,
        music:music,
        record:record
    });
}

module.exports.categories_list=(req,res)=>{
    var music=null;
    var record=null;
    res.render('home',{
        title:'Musify - Top Categories',
        path:req.route.path,
        music:music,
        record:record
    });
}

module.exports.uploadSong=(req,res)=>{
    console.log('name: ',req.params.name);
    console.log('name: ',req.params.user_id);
    var music=null;
    var record=null;
    res.render('upload_song',{
        title:'Musify - Upload Song',
        name:req.params.name,
        path:req.route.path,
        music:music,
        record:record
    });
}

module.exports.Adminupload=(req,res)=>{
    var music=null;
    var record=null;
    res.render('adminupload',{
        title:'Musify - Admin Upload',
        path:req.route.path,
        music:music,
        record:record
    })
}

module.exports.AdminSongUpload=(req,res)=>{
    var music=null;
    var record=null;
    res.render('adminuploadsong',{
        title:'Musify - Upload Song',
        path:req.route.path,
        id:req.params.id,
        music:music,
        record:record
    })
}

module.exports.addCategory=(req,res)=>{
    var music=null;
    var record=null;
    res.render('addcategory',{
        title:'Musify - Add Category',
        path:req.route.path,
        music:music,
        record:record
    })
}

module.exports.addCategoryImage=(req,res)=>{
    var music=null;
    var record=null;
    res.render('addcategoryimage',{
        title:'Musify - Upload Image',
        path:req.route.path,
        id:req.params.id,
        music:music,
        record:record
    })
}

module.exports.playlistPage=(req,res)=>{

    Category.findOne({category_name:req.params.name},function(err,record){
        console.log('id:',record.id);
        
        adminMusic.find({category:record.id},function(err,music){
            res.render('songsPage',{
                title:`Musify-${req.params.name}`,
                path:req.route.path,
                name:req.params.name,
                record:record,
                music:music
            })
        });
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
                    singername:req.body.singername,
                    user:req.params.user_id});
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
            res.redirect('/music/categories_list');
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
                console.log('Error occured while uploading music through admin',err);
            }
            if(req.file){
                music.adminsong=adminMusic.avatarPath+'/'+req.file.filename;
            }
            music.save();
        })
        const uploading_category=await Category.findByIdAndUpdate(music.category);
        
        uploading_category.adminmusic.push(music.id);
        uploading_category.save();
        res.redirect('/music/admin/upload');
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

module.exports.createCategory=async (req,res)=>{;
    console.log(req.body.category_name);
        const find_cat=await Category.findOne({category_name:req.body.category_name});
        if(find_cat){
            console.log('category found');
            res.redirect(`/music/addcategoryimagePage/${req.body.category_name}`);
        }
        else{
            const create=await Category.create({category_name:req.body.category_name,description:req.body.description});
            console.log('category created : ',create.id);
            res.redirect(`/music/addcategoryimagePage/${create.id}`);            
        }
}

module.exports.categoryImage=async (req,res)=>{
    try {
        let created_category=await Category.findByIdAndUpdate(req.params.id);
    if(created_category){
        console.log('category found in uploading function');
        Category.uploadedAvatar(req,res,function(err){
            if(err){
                console.log('Error occured while uploading category image through admin',err);
            }
            if(req.file){
                console.log('image added');
                created_category.image=Category.avatarPath+'/'+req.file.filename;
            }
            created_category.save();
        })
    }
    else{
        console.log('Failed to upload the category image');
    }
    } catch (error) {
        console.log('error category image: ',error);
        
    }
    res.redirect('/music/addcategoryPage');
}