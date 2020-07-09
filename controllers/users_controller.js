const User=require('../models/users');
const Music=require('../models/music');
const Category=require('../models/category');
const adminMusic=require('../models/music_admin');
const db=require('../config/mongoose');

module.exports.signin=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/music/categories_list');
    }
    res.render('signin',{
        title:'Musify - Sign In',
        path:req.route.path
    })
}

module.exports.signup=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/music/categories_list');
    }
    
    res.render('sign-up',{
        title:'Musify - Sign Up',
        path:req.route.path
    })
}

module.exports.create_user=(req,res)=>{
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in creating user');
            res.redirect('back');
        }

        if(!user){
            User.create({
                name:req.body.name,
                password:req.body.password,
                email:req.body.email
            },function(err,created_user){
                if(err){
                    console.log('Error in creating user');
                    res.redirect('back');
                }
                console.log('User Created Successfully');
                res.redirect('/users/signin');
            })
        }
        else{
            console.log('User is already registered');
            res.redirect('back');
        }
    })   
}

module.exports.createSession=(req,res)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    if(req.body.email=="pradyuman@admin.com"&&req.body.password=="admin123"){
        res.redirect('/music/admin/upload');
    }
    else{
        User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signUp');
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                console.log('here in comp pass');
            }
            res.cookie('user_id',user.id);
            res.redirect('/music/categories_list');
        }
        else{
             res.redirect('/music/categories_list')
        }
    })}
    
}

module.exports.destroySession= function(req,res){
    req.logout();
    // req.flash('success','You have been Logged Out');
    console.log('You have been loggeg out');
    return res.redirect('/');
}

module.exports.search=async (req,res)=>{
    try {
        console.log(req.body.search);
        let find_music=await adminMusic.find({admin_music_name:req.body.search});
        if(find_music.length){
            let find_category=await Category.findById(find_music[0].category);
            let rec=new Array();
            for(let i=0;i<1;i++){
                rec[i]=[];
            }
            for(i=0;i<1;i++){
                for(let j=0;j<1;j++){
                    rec[i][j]=find_music[i];
                }
            }
            
            let rec2=new Array();
            for(i=0;i<1;i++){
                rec2[i]=find_category;
            }
            
            res.render('search_results',{
                title:'Musify - Search Song',
                music:rec,
                record:rec2,
                path:req.route.path,
                query:req.body.search
            })
        }
        else{
            find_music=await adminMusic.find({singername:req.body.search});
            if(find_music.length){
                let find_category=await Category.findById(find_music[0].category);
                let rec=new Array();
            for(let i=0;i<1;i++){
                rec[i]=[];
            }
            for(i=0;i<1;i++){
                for(let j=0;j<1;j++){
                    rec[i][j]=find_music[i];
                }
            }
            
            let rec2=new Array();
            for(i=0;i<1;i++){
                rec2[i]=find_category;
            }
            console.log('Result : ',rec2);
            
                res.render('search_results',{
                    title:'Musify - Search Song',
                    music:rec,
                    record:rec2,
                    path:req.route.path,
                    query:req.body.search
                })  
            }
            else{
                db.collection("Category").createIndex({category_name:"text",description:"text"});
                db.collection("AdminMusic").createIndex({admin_music_name:"text",singername:"text"});
                let search_item=req.body.search;
                let words=search_item.split(" ");
                // let music1=await adminMusic.find({$text: {$search: words, $caseSensitive:false}});
                Category.find({$text: {$search: search_item, $caseSensitive:false}},async function(err,category_rec){
                    if(err){
                        console.log("ERROR : ",err);
                        res.redirect('back');
                    }
                    if(category_rec.length){
                        let rec_array=new Array();
                        for(let i=0;i<category_rec.length;i++){
                            rec_array[i]=[];
                        }
                        for(let i=0;i<category_rec.length;i++){
                            for(let j=0;j<category_rec[i].adminmusic.length;j++){
                                rec_array[i][j]=await adminMusic.findById(category_rec[i].adminmusic[j]);
                            }
                        }
                        
                        res.render('search_results',{
                            title:'Musify - Search Song',
                            music:rec_array,
                            record:category_rec,
                            path:req.route.path,
                            query:req.body.search
                        })  
                    }
                    else{
                        res.redirect('/music/categories_list');
                    }
                });
                
            }
        }        
    } catch (error) {
        if(error){
            console.log('Error');
            return res.redirect('back');
        }
    }
}

module.exports.user_profile=async (req,res)=>{
    try {
        var record=await Music.find({user:req.params.id});
        var user=await User.findById(req.params.id);
        res.render('user_profile',{
            title:'Musify - '+user.name,
            music:record,
            user:user,
            path:req.route.path,
            record:record
        })
    } catch (error) {
        console.log('Error Occured : ',error);
        res.redirect('back');
    }
}
